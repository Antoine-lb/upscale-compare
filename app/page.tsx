"use client";
import { ReactCompareSlider } from "react-compare-slider";
import { useRef, useState } from "react";
import ImageZoom2 from "./ImageZoom2";
import DropZone from "./DropZone";

export default function Home() {
  const [files, setFiles] = useState([]);
  const [indexFileLeft, setIndexFileLeft] = useState<number | null>(null);
  const [indexFileRight, setIndexFileRight] = useState<number | null>(null);

  const containerRef = useRef(null);
  const [wheelState, setWheelState] =
    useState<React.WheelEvent<HTMLDivElement> | null>(null);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    console.log("files", files);
    setWheelState(e);
  };

  const thumbsLeft = files.map((file, i) => (
    <button
      className=" w-10 h-10"
      key={file.name}
      onClick={() => setIndexFileLeft(i)}
    >
      <div>
        <img
          src={file.preview}
          alt="preview"
          // Revoke data uri after image is loaded
          // onLoad={() => {
          //   URL.revokeObjectURL(file.preview);
          // }}
        />
      </div>
    </button>
  ));

  const thumbsRight = files.map((file, i) => (
    <button
      className=" w-10 h-10"
      key={file.name}
      onClick={() => setIndexFileRight(i)}
    >
      <div>
        <img
          src={file.preview}
          alt="preview"
          // Revoke data uri after image is loaded
          // onLoad={() => {
          //   URL.revokeObjectURL(file.preview);
          // }}
        />
      </div>
    </button>
  ));

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
            <ImageZoom2
              imgSrc={
                files[indexFileLeft || 0]?.preview ||
                "https://picsum.photos/700/700"
              }
              offsetLeft={containerRef?.current?.offsetLeft}
              offsetTop={containerRef?.current?.offsetTop}
              wheelEvent={wheelState}
              elementIdentifier="itemOne"
            />
          }
          itemTwo={
            <ImageZoom2
              imgSrc={
                files[indexFileRight !== null ? indexFileRight : 1]?.preview ||
                "https://picsum.photos/401/401"
              }
              offsetLeft={containerRef?.current?.offsetLeft}
              offsetTop={containerRef?.current?.offsetTop}
              wheelEvent={wheelState}
              elementIdentifier="itemTwo"
            />
          }
        />
      </div>

      <DropZone
        onDropCallback={(acceptedFiles) =>
          setFiles(
            acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            )
          )
        }
      />
      <aside>{thumbsLeft}</aside>
      <aside>{thumbsRight}</aside>
    </main>
  );
}
