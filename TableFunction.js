import React from 'react';


export const TableFunction = (props)=> {
    const data = props.customer;

    let x = null;
    if (data.length === 0) x = <p>Et ole hakenut vielä tai annetuilla hakuehdoilla ei löytynyt dataa</p>

    const tb = data.map((item, index) => {
        return <tr key={index} style={{borderStyle : ""}}>
                    <td>{item.Nimi}</td>
                    <td>{item.Osoite}</td>
                    <td>{item.Postinumero}</td>
                    <td>{item.Postitoimipaikka}</td>
                    <td>{item.Puhelinnumero}</td>
                    <td>{item.Tyyppi_id}</td>
                    <td>{item.Tyyppi_selite}</td>
                    <td><button onClick={() => props.delete()}>Poista</button></td>
                    
                </tr>
    })

    return (
        <div>
            {x}
            <table style={{borderStyle : ""}}>
                <tbody>
                    {tb}
                </tbody>
            </table>
        </div>
    )
}