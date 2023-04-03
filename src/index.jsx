import React from "react";

import "./styles.css";
import { PanelController } from "./controllers/PanelController.jsx";
import { LaraLabs } from "./panels/laralabs.jsx";

import { entrypoints } from "uxp";


const laralabsController =  new PanelController(() => <LaraLabs/>, { id: "laralabs", menuItems: [ 
    { id: "reload", label: "Reload Plugin", enabled: true, checked: false, oninvoke: () => location.reload() }
] });

entrypoints.setup({
    plugin: {
        create(plugin) {
            /* optional */ console.log("created", plugin);
        },
        destroy() {
            /* optional */ console.log("destroyed");
        }
    },
    panels: {
        laralabs: laralabsController
    }
});
