import React from "react";
import { LaraImageTable } from "../components/LaraImageTable.jsx";
import { LaraPrompt } from "../components/LaraPrompt.jsx";

export const LaraCreateTab = (props) => {
    return (
        <div style={{marginTop: "10px"}}>
            <LaraPrompt style={{marginBottom:"100px"}} />
            <sp-divider size="m"></sp-divider>
            <h2 className="spectrum-Heading spectrum-Heading--sizeS" style={{color:"#ffffff"}}>Results</h2>
            <LaraImageTable imageIds={["house7", "house8", "house9", "house10"]} />
        </div>
        
    );
      
}
