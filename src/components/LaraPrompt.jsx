import React from "react";

export const LaraPrompt = (props) => {

    const doGenCall = async () => {
        // 1.upload file if needed
        // 2.upload instruction json
        // const res = await fetch(props.imageUrl);
      };

    return (
        <>
            <sp-textarea id="prompt-0" width="100%" multiline grows placeholder="Describe what to create"/>
            <div style={{margin: "10px", alignItems:"top"}}>
                <sp-checkbox size="m" width="80%" >Create from sketch</sp-checkbox>
                <sp-button>Create</sp-button>
            </div>
        </>
    );
} 
