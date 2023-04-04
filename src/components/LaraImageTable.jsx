import React, { useEffect, useState } from "react";
import { LaraImage } from "../components/LaraImage.jsx";
import "../components/LaraImageTable.css";

export const LaraImageTable = (props) => {
    const [selectedImg, setSelectedImg] = useState();
    const imageBaseURI = 'https://y6uchwsnucplc5fl7riiza6hqy0wpmuf.lambda-url.eu-central-1.on.aws/?id=';
    const columns = 2;

    const cellRefs = {};

    const updateSelected = (imageId, event) => {
        if (imageId == selectedImg) return;
        if (selectedImg) cellRefs[selectedImg].className = "";
        cellRefs[imageId].className = "selectedImage";
        setSelectedImg(imageId);
    };

    const laraImageCell = (imageId) => {
        return (
            <td key={imageId} 
                id={"td-" + imageId} 
                style={{padding:"5px", boxSizing: "border-box"}} 
                onClick={(event) => updateSelected(imageId, event)}
                ref={ref => cellRefs[imageId] = ref}
                >
                <LaraImage width="200px" imageUrl={imageBaseURI + imageId}/>
            </td>
        );
    };

    const cells = props.imageIds.map((imageId) => laraImageCell(imageId));
    

    const showTable = () => {
        const tableRows = [];
        for (let i = 0; i < cells.length; i = i + columns) {
              tableRows.push(<tr key={"results-"+i+"-"+(i+1)}>{cells.slice(i, i + columns)}</tr>);
        }
        return tableRows;
    }
    
    return (
        <>
            <table>
                <tbody>
                    {showTable()}
                </tbody>
            </table>
            <sp-button style={{marginTop:"15px", marginLeft:"8px"}}>Use</sp-button>
        </>
        
    );
      
}
