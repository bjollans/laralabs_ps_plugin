import React, { useEffect, useState } from "react";

export const LaraPrompt = (props) => {
    const [prompt, setPrompt] = useState();

    return (
        <>
            <sp-textarea 
                id="prompt-0" 
                width="100%" 
                multiline 
                grows 
                placeholder="Describe what to create"
                value={prompt}
                onInput={(event) => setPrompt(event.target.value)}/>
            <div style={{margin: "10px", alignItems:"top"}}>
                <sp-checkbox size="m" width="80%" >Create from sketch</sp-checkbox>
                <sp-button onClick={() => props.generate(prompt)}>Create</sp-button>
            </div>
        </>
    );
} 
