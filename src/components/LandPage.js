import React from 'react';
import Image from "../images/home-ban.png";

const imgHeight = window.innerHeight - 56;

const backgroundImage = {
  backgroundImage: `url(${Image})`,
  backgroundColor: "#cccccc",
  height: imgHeight,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  position: "relative",
  // opacity : "0.6"
};

const backgroundText = {
  textAlign: "center",
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "black",
  // opacity: "1"
}


export default function LandPage() {

  return (
    <div>
      <div style = { backgroundImage}>
        <div style = { backgroundText}>
          <h1>Any text</h1>
          <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>
        </div>
      </div>
    </div>
  )
}