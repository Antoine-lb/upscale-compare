"use client";
import { ReactCompareSlider } from "react-compare-slider";
import { useRef, useState } from "react";
import ImageZoom from "./ImageZoom";

export default function Home() {
  const containerRef = useRef(null);
  const [wheelState, setWheelState] =
    useState<React.WheelEvent<HTMLDivElement> | null>(null);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    setWheelState(e);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#35363B]">
      <div
        className="container bg-yellow-500"
        ref={containerRef}
        onWheel={handleWheel}
      >
        <ReactCompareSlider
          // itemOne={<img src="https://picsum.photos/400/400" alt="asdf" />}
          itemOne={
            <ImageZoom
              imgSrc="https://picsum.photos/700/700"
              offsetLeft={containerRef?.current?.offsetLeft}
              offsetTop={containerRef?.current?.offsetTop}
              wheelEvent={wheelState}
              elementIdentifier="itemOne"
            />
          }
          itemTwo={
            <ImageZoom
              imgSrc="https://picsum.photos/401/401"
              offsetLeft={containerRef?.current?.offsetLeft}
              offsetTop={containerRef?.current?.offsetTop}
              wheelEvent={wheelState}
              elementIdentifier="itemTwo"
            />
          }
        />
      </div>
      outside
    </main>
  );
}
