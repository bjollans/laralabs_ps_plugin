import React, { useEffect, useState } from "react";

export const LaraImage = (props) => {
    const [img, setImg] = useState();
    const [selected, setSelected] = useState();

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
        <img 
        onClick={() => setSelected(!selected)}
        class={selected? "laraimageselected" : "laraimage"} 
        width={selected? props.width+10 : props.width} src={img} alt="icons" />
      </>
    );
} 
