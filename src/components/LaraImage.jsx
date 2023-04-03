import React, { useEffect, useState } from "react";

export const LaraImage = (props) => {
    const [img, setImg] = useState();

    const fetchImage = async () => {
      const res = await fetch(props.imageUrl);
      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImg(imageObjectURL);
    };
  
    useEffect(() => {
      fetchImage();
    }, []);
  
    return (
      <>
        <img width="80%" src={img} alt="icons" />
      </>
    );
} 
