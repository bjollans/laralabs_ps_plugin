import React from "react";

import { LaraCreateTab } from "../components/LaraCreateTab.jsx";
import "../components/TabFix.css";

export const LaraLabs = () => {



    return (
        <>
            <div class="sp-tabs">
                <div class="sp-tab selected" id="sp-create-tab">
                    <sp-label>Create</sp-label>
                </div>
                <div class="sp-tab" id="sp-history-tab">
                    <sp-label>History</sp-label>
                </div>
                <div class="sp-tab-page visible-hack" id="sp-create-tab">
                    <LaraCreateTab/>
                </div>
                <div class="sp-tab-page visible-hack" style={{visibility:"hidden"}} id="sp-history-tab">
                    <p>History...</p>
                </div>
            </div>
        </>

    );
}
