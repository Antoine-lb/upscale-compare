"use client";

import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {
  ReactCompareSlider,
  ReactCompareSliderHandle,
} from "react-compare-slider";

export default function ImageZoom2() {
  let portrait = false;
  return (
    <div className="flex justify-center items-center">
      <TransformWrapper>
        <TransformComponent>
          <ReactCompareSlider
            // itemOne={<img src="https://picsum.photos/400/400" alt="asdf" />}
            handle={
              <ReactCompareSliderHandle
                portrait={portrait}
                buttonStyle={{
                  display: "none",
                }}
                // Make lines thicker so they're easier to grab.
                linesStyle={{
                  width: portrait ? "100%" : 0,
                  height: portrait ? 0 : "100%",
                }}
              />
            }
            itemOne={
              <img
                src="https://source.unsplash.com/random/400x300?sky"
                alt="test"
              />
            }
            itemTwo={
              <img
                src="https://source.unsplash.com/random/300x300?dog"
                alt="test"
              />
            }
          />
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}
