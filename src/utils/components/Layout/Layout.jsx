import React from "react";
import { useState, useEffect } from "react";
import calculateAspectRatio from "calculate-aspect-ratio";

const Layout = ({ children }) => {
  // const { height, width } = useWindowDimensions();
  // const [wide, setWide] = useState(false);
  // useEffect(() => {
  //   if (width/height > 2) {
  //     setWide(true);
  //   } else {
  //     setWide(false);
  //   }
  // }, [width]);
 // return <div id="fullContainer" className="container-fluid" style={wide?{width:'80vw'}:{}}>{children}</div>;
 return <div id="fullContainer" className="container-fluid">{children}</div>;
};

export default Layout;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
