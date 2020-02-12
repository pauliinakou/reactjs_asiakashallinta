import React from 'react';
import {TableFunction} from './TableFunction'


export default class CustomerApp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          loading : true,
          customer : [],
          customername : '',
          address : '',
          dublicateFound : false,
          customertype: ''
      }
    }

    inputChanged(event) {
        this.setState({[event.target.name] : event.target.value});
    }


    

    async fetchData()
    {
        //hae asiakkaita millä tahansa hakuehtojen kombinaatiolla, tai ilman hakuehtoja. haettu data näytetään tablessa
        let URI = 'http://localhost:3002/asiakas?'; //haetaan kaikki jos ei hakuehtoja
        

            // rivit 26-34 testataan hakuehdot nimellä, osoitteella ja yhdistelmällä
            if (this.state.customername !== "") {
                URI = URI + 'Nimi=' + this.state.customername;
            }
            if (this.state.customername !== "" && this.state.address !== "") {
                URI = URI + '&';
            }
            if (this.state.address !== ""){
                URI = URI + 'Osoite=' + this.state.address;
            }

            if ((this.state.address !== "" || this.state.customername !== "") && this.state.customertype !== ""){
                URI = URI + '&';
            }

            if (this.state.customertype !== "") {
                URI = URI + 'Tyyppi_id=' + this.state.customertype;
            }

            
            
            console.log("URI", URI)
            
        try{
            
            let response = await fetch(
                URI,
                {
                    method : "GET",
                    headers : {"Content-type" : "application/json"}
                }
            );
            console.log("response", response);
            let data = await response.json();
            this.setState({customer : data});
        }
        catch(e)
        {
            console.log("Virhe: ", e)
        }
    }

    //poistetaan asiakas
    async deleteData()
    {
        //await this.fetchData();
        const ID = this.state.customer.map((c) => <p key={c.id}>{c.id}</p>)
        console.log("ID: ", ID[0].key)
        try{
            let response = await fetch(
                "http://localhost:3002/asiakas/" + ID[0].key,
                {
                    method : "DELETE",
                    headers : {"Content-type" : "application/json"},
                }
            );
            console.log("Response", response)
            console.log("poisto onnistui");
            this.fetchData();
        }
        // otetaan kiinni virhetilanteet, ohjelma ei kaadu
        catch(e)
        {
            console.log("Virhe:", e);
        }
    }

    render()
    
    {
        
       
        return (
            this.state.loading ? <div>Loading...</div> :
            <div>
                Nimi : <input type="text" name="customername" value={this.state.cutomername} onChange={(e) => this.inputChanged(e)}></input>
                Osoite : <input type="text" name="address" value={this.state.address} onChange={(e) => this.inputChanged(e)}></input>
                {
                    // voidaan valita hakuehdoksi myös asiakastyyppi
                }
                <select name="customertype" value={this.state.customertype} onChange={(e) => this.inputChanged(e)}>
                    <option value=""></option>
                    <option value="1">Yritysasiakas</option>
                    <option value="2">Kuluttaja-asiakas</option>
                </select>
                <button onClick={() => this.fetchData()}>Hae</button>
                
                <Customers customer={this.state.customer} delete={(x) => this.deleteData(x)}/>

            </div>
        )
    }
}
// 
const Customers = (props) => {
    //let customers = props.customer.map((c) => <p key={c.id}>{c.Nimi}, {c.Osoite}, {c.Postinumero}, {c.Postitoimipaikka}, {c.Puhelinnumero}, {c.Tyyppi_id}, {c.Tyyppi_selite}</p>)
    
    
    return (
        <div>
            {
                // poista nappi tulee tablecomponentin kautta
            }
            <TableFunction customer = {props.customer} delete={(x) => props.delete(x)}/>
        </div>
    )
}
