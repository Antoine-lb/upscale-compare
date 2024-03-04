"use client";
import { useRef, useState } from "react";
import ImageZoom from "../ImageZoom";

export default function Home() {
  const [files, setFiles] = useState([]);
  const [indexFileLeft, setIndexFileLeft] = useState<number | null>(null);
  const [indexFileRight, setIndexFileRight] = useState<number | null>(null);

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
        <ImageZoom
          imgSrc={
            files[indexFileRight !== null ? indexFileRight : 0]?.preview ||
            "https://picsum.photos/401/401"
          }
          offsetLeft={containerRef?.current?.offsetLeft}
          offsetTop={containerRef?.current?.offsetTop}
          wheelEvent={wheelState}
          elementIdentifier="itemTwo"
        />
      </div>
    </main>
  );
}
