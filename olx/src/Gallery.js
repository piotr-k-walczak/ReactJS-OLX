import React from "react";
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';

export function Gallery(props) {
  return (
    <AwesomeSlider animation="cubeAnimation">
      <div data-src="/logo192.png" />
      <div data-src="/logo192.png" />
      <div data-src="/logo192.png" />
      <div data-src="/logo192.png" />
    </AwesomeSlider>
  );
}

export default Gallery;
