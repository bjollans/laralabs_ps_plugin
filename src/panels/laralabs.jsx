import React from "react";

import { LaraImage } from "../components/LaraImage.jsx";
import { LaraPrompt } from "../components/LaraPrompt.jsx";
import { PlayIcon } from "../components/Icons.jsx";

export const LaraLabs = () => {
    return (
        <>
            <LaraPrompt/>
            <LaraImage imageUrl="https://petapixel.com/assets/uploads/2021/12/The-Best-Plugins-for-Photoshop-and-Lightroom-in-2021-800x420.jpg"/>
        </>
    );
    }
