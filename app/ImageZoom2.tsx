import React, { Component } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function ImageZoom2() {
  return (
    <TransformWrapper>
      <TransformComponent>
        <img src="https://source.unsplash.com/random/300x300?sky" alt="test" />
      </TransformComponent>
    </TransformWrapper>
  );
}
