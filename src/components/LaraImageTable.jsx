import React, { useEffect, useState } from "react";
import { LaraImage } from "../components/LaraImage.jsx";
import "../components/LaraImageTable.css";

export const LaraImageTable = ({jobId}) => {
    const [generationProgress, setGenerationProgress] = useState();
    const [selectedImg, setSelectedImg] = useState();
    const [cells, setCells] = useState([]);
    const imageBaseURI = 'https://y6uchwsnucplc5fl7riiza6hqy0wpmuf.lambda-url.eu-central-1.on.aws/?id=';
    const columns = 2;

    const cellRefs = {};
    const imageIds = [0,1,2,3].map((x) => jobId + "_" + x);
    
    function wait(delay){
        return new Promise((resolve) => setTimeout(resolve, delay));
    }

    const pollImageReadiness = async (url, delay, tries) => {
        if (tries < 1) return;
        setGenerationProgress((40-tries)*7);
        console.log("polling with tries left: " + tries);
        return fetch(url).then(response => response.text()).then((text) => {
            if(!text.includes("ready")) {
                return wait(delay).then(()=> pollImageReadiness(url, delay,tries-1));
            }
        });
    }

    const fetchImage = async (imageUrl) => {
        console.log("fetching image");
        const res = await fetch(imageUrl);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        return imageObjectURL;
      };

    const cleanSelected = () => {
        imageIds.forEach((imageId) => {
            if(imageId in cellRefs) cellRefs[imageId].className = ""
        });
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
        setCells([]);
        const pollUrl = imageBaseURI + jobId + "&poll=true";
        pollImageReadiness(pollUrl, 1000, 40)
            .then(() => Promise.all(imageIds.map(async (imageId) => await laraImageCell(imageId))))
            .then((values) => setCells(values));
      }, [jobId]);
    
    useEffect(() => {
        setGenerationProgress(0);
    }, [cells]);

    return (
        <>
            <table>
                <tbody>
                    {showTable()}
                </tbody>
            </table>
            <sp-progressbar style={generationProgress==0?{visibility: "hidden", height: "1px"}:{marginLeft:"8px"}}
                max={100} value={generationProgress}>
                <sp-label slot="label">Generating Art</sp-label>
            </sp-progressbar>
            <sp-button 
                style={{marginTop:"15px", marginLeft:"8px"}}
                onClick={() => require('photoshop').core.executeAsModal(downloadIt)}
                >
                    Use
            </sp-button>
        </>
        
    );
      
}
