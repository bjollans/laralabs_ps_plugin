import React, { useEffect, useState } from "react";
import { LaraImage } from "../components/LaraImage.jsx";
import "../components/LaraImageTable.css";

export const LaraImageTable = (props) => {
    const [selectedImg, setSelectedImg] = useState();
    const [cells, setCells] = useState([]);
    const imageBaseURI = 'https://y6uchwsnucplc5fl7riiza6hqy0wpmuf.lambda-url.eu-central-1.on.aws/?id=';
    const columns = 2;

    const cellRefs = {};

    const fetchImage = async (imageUrl) => {
        const res = await fetch(imageUrl);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        return imageObjectURL;
      };

    const cleanSelected = () => {
        props.imageIds.forEach((imageId) => cellRefs[imageId].className = "");
    }

    const downloadIt = async () =>  {
        const app = require('photoshop').app;
        const image = await fetch(imageBaseURI + selectedImg);
        const fs = require('uxp').storage.localFileSystem;

        try {
          const pluginFolder = await fs.getDataFolder();
          const img = await image.arrayBuffer();
          const file = await pluginFolder.createFile("image.png", {overwrite: true});
          await file.write(img);
          const currentDocument = app.activeDocument;
          const newDocument = await app.open(file);
          if (currentDocument) {
            await newDocument.activeLayers[0].duplicate(currentDocument);
            await newDocument.close();
          }
          cleanSelected();
          setSelectedImg(null);
        } catch (e) {
          console.log(e);
        }
    
        if (!file) {
          return;
        }
      }

    const updateSelected = (imageId, event) => {
        if (imageId == selectedImg) return;
        cleanSelected();
        if (selectedImg) cellRefs[selectedImg].className = "";
        cellRefs[imageId].className = "selectedImage";
        setSelectedImg(imageId);
    };

    const laraImageCell = async (imageId) => {
        return (
            <td key={imageId} 
                id={"td-" + imageId} 
                style={{padding:"5px", boxSizing: "border-box"}} 
                onClick={(event) => updateSelected(imageId, event)}
                ref={ref => cellRefs[imageId] = ref}
                >
                <LaraImage 
                    width="200px" 
                    imageUrl={imageBaseURI + imageId}
                    img={await fetchImage(imageBaseURI + imageId)}/>
            </td>
        );
    };
    
    const showTable = () => {
        const tableRows = [];
        for (let i = 0; i < cells.length; i = i + columns) {
              tableRows.push(<tr key={"results-"+i+"-"+(i+1)}>{cells.slice(i, i + columns)}</tr>);
        }
        return tableRows;
    }
    
    useEffect(() => {
        Promise.all(props.imageIds
            .map(async (imageId) => await laraImageCell(imageId)))
            .then((values) => setCells(values));
      }, []);
    
    return (
        <>
            <table>
                <tbody>
                    {showTable()}
                </tbody>
            </table>
            <sp-button 
                style={{marginTop:"15px", marginLeft:"8px"}}
                onClick={() => require('photoshop').core.executeAsModal(downloadIt)}
                >
                    Use
            </sp-button>
        </>
        
    );
      
}
