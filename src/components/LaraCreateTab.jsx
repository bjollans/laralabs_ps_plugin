import React, { useEffect, useState } from "react";
import { LaraImageTable } from "../components/LaraImageTable.jsx";
import { LaraPrompt } from "../components/LaraPrompt.jsx";

export const LaraCreateTab = (props) => {
    const [jobId, setJobId] = useState();
    const baseUrl='https://y6uchwsnucplc5fl7riiza6hqy0wpmuf.lambda-url.eu-central-1.on.aws/?'

    const getRandomId = () => {
        return (Math.random() + 1).toString(36).substring(2);
    };

    const generate = async (prompt) => {
        console.log("generating with prompt: " + prompt);
        const newId = getRandomId();
        setJobId(newId);
        // 1.upload file if needed
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
