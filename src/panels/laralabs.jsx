import React from "react";

import { LaraCreateTab } from "../components/LaraCreateTab.jsx";
import "../components/TabFix.css";

export const LaraLabs = () => {

    return (
        <>
            <div className="sp-tabs">
                <div className="sp-tab selected" id="sp-create-tab">
                    <sp-label>Create</sp-label>
                </div>
                <div className="sp-tab" id="sp-history-tab">
                    <sp-label>History</sp-label>
                </div>
                <div className="sp-tab-page visible-hack" id="sp-create-tab">
                    <LaraCreateTab/>
                </div>
                <div className="sp-tab-page visible-hack" style={{visibility:"hidden"}} id="sp-history-tab">
                    <p>History...</p>
                </div>
            </div>
        </>

    );
}
