import React, { useEffect, useState } from "react";
import { LaraImageTable } from "../components/LaraImageTable.jsx";
import { LaraPrompt } from "../components/LaraPrompt.jsx";

export const LaraCreateTab = (props) => {
    const [jobId, setJobId] = useState();
    const baseUrl='https://y6uchwsnucplc5fl7riiza6hqy0wpmuf.lambda-url.eu-central-1.on.aws/?'

    const getRandomId = () => {
        return (Math.random() + 1).toString(36).substring(2);
    };

    const uploadCurrentDocument = async (id) => {
        const app = require('photoshop').app;
        const fs = require('uxp').storage.localFileSystem;
        const formats = require('uxp').storage.formats;
        const pluginFolder = await fs.getDataFolder();
        
        const myDoc = app.activeDocument;
        const file = await pluginFolder.createFile("untitled.png", {overwrite: true});
        //Writing and reading to get it into PNG and then convert PNG to Base64
        await require('photoshop').core.executeAsModal(() => myDoc.saveAs.png(file));
        const readFile = await file.read({format: formats.binary});
        const b64 = btoa(String.fromCharCode.apply(null, new Uint8Array(readFile)));
        await fetch(baseUrl+'id='+id, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({img: b64})});
    }

    const generate = async (prompt, isSketch) => {
        console.log("generating with prompt: " + prompt);
        const newId = getRandomId();
        setJobId(newId);
        // 1.upload file if needed
        if (isSketch) {
            uploadCurrentDocument(newId)
        }
        // 2.upload instruction json
        fetch(encodeURI(baseUrl + "id="+newId + "&prompt="+prompt));
      };

    return (
        <div style={{marginTop: "10px"}}>
            <LaraPrompt generate={generate} style={{marginBottom:"100px"}} />
            <sp-divider size="m"></sp-divider>
            <h2 className="spectrum-Heading spectrum-Heading--sizeS" style={{color:"#ffffff"}}>Results</h2>
            <LaraImageTable jobId={jobId} />
        </div>
        
    );
      
}
