import React from "react";
import { LaraImage } from "../components/LaraImage.jsx";

export const LaraImageTable = (props) => {
    const imageBaseURI = 'https://y6uchwsnucplc5fl7riiza6hqy0wpmuf.lambda-url.eu-central-1.on.aws/?id=';

    

    const showTable = () => {
        const tableRows = [];
        for (let i = 0; i < props.imageIds.length; i = i + 2) {
              tableRows.push(
                <tr key={props.imageIds[i] + "-" + props.imageIds[i + 1] + "-" + i}>
                    <td style={{padding:"5px"}}>
                        <LaraImage width="200px" imageUrl={imageBaseURI + props.imageIds[i]}/>
                    </td>
                    <td style={i==2? {
                        padding:"5px", 
                        border: '3px solid rgba(24, 115, 230)'
                    } : {padding:"5px"}}>
                        <LaraImage width="200px" selected={i==2} imageUrl={imageBaseURI + props.imageIds[i + 1]}/>
                    </td>
                </tr>
              );
        }
        return tableRows;
    }
    
    return (
        <>
            <table>
                {showTable()}
            </table>
            <sp-button style={{marginTop:"15px", marginLeft:"8px"}}>Use</sp-button>
        </>
        
    );
      
}
