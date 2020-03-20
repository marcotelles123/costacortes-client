import React, { useState, useEffect } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app

function LightBox(props) {
  debugger;
  const openImage = props.openImageState[0];
  const setOpenImage = props.openImageState[1];

  return (
    <Lightbox
      mainSrc={props.imageBytes}
      nextSrc={props.imageBytes}
      prevSrc={props.imageBytes}
      onCloseRequest={console.log("fechando")}
      onCloseRequest={() => setOpenImage(false)}
    />
  );
}

export default LightBox;
