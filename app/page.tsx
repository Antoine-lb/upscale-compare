/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import DropZone from "./DropZone";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {
  ReactCompareSlider,
  ReactCompareSliderHandle,
} from "react-compare-slider";
import prettyBytes from "pretty-bytes";
import Head from "next/head";

// async function getImageDimensions(file) {
//   let img = new Image();
//   img.src = URL.createObjectURL(file);
//   await file.preview.decode();
//   let width = img.width;
//   let height = img.height;
//   console.log("{", {
//     width,
//     height,
//   });
//   return width;
//   return {
//     width,
//     height,
//   };
// }

export default function Home() {
  const [files, setFiles] = useState<{ file: File; preview: string }[]>([]);
  const [indexFileLeft, setIndexFileLeft] = useState<number | null>(null);
  const [indexFileRight, setIndexFileRight] = useState<number | null>(null);
  let portrait = false;

  const thumbsLeft = files.map((file, i) => (
    <button
      className={`flex items-center w-full h-24  mb-2 rounded-2xl  hover:bg-white/20 transition-all duration-300 ease-in-out ${
        indexFileLeft === i ? "bg-white/40" : "bg-white/10"
      }`}
      key={file.file.name}
      onClick={() => setIndexFileLeft(i)}
    >
      <div className="flex px-2 gap-3  justify-center items-center ">
        <img
          className="max-w-16 max-h-16 rounded"
          src={file.preview}
          alt="preview"
        />
        <div className="text-left">
          <p> {file.file.name} </p>
          <p className="italic font-light"> {prettyBytes(file.file.size)} </p>
          {/* <p> {getImageDimensions(file)} </p> */}
        </div>
      </div>
    </button>
  ));

  const thumbsRight = files.map((file, i) => (
    <button
      className={`flex items-center w-full h-24  mb-2 rounded-2xl  hover:bg-white/20 transition-all duration-300 ease-in-out ${
        indexFileRight === i ? "bg-white/40" : "bg-white/10"
      }`}
      key={file.file.name}
      onClick={() => setIndexFileRight(i)}
    >
      <div className="flex px-2 gap-3  justify-center items-center ">
        <img
          className="max-w-16 max-h-16 rounded"
          src={file.preview}
          alt="preview"
        />
        <div className="text-left">
          <p> {file.file.name} </p>
          <p className="italic font-light"> {prettyBytes(file.file.size)} </p>
          {/* <p> {getImageDimensions(file)} </p> */}
        </div>
      </div>
    </button>
  ));

  function addFiles(acceptedFiles: File[], side: "left" | "right" | null) {
    const filesWithPreview = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setFiles([...files, ...filesWithPreview]);
    if (side === "left") {
      setIndexFileLeft(files.length);
    }
    if (side === "right") {
      setIndexFileRight(files.length);
    }
  }

  return (
    <main className=" min-h-screen">
      <Head>
        <title>My page title</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <div className="flex p-4 items-center">
        <img className=" w-16 rounded-xl" src="/us-logo.webp" alt="asdf" />
        <h1 className="pl-3 text-3xl font-bold text-white/70">
          Upscale compare
        </h1>
      </div>
      <div className="flex  flex-col items-center justify-between p-24 pt-5 ">
        <div className="flex justify-center items-center cursor-col-resize  border border-[#822f8f] shadow-lg shadow-[#822f8f]/20">
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
                      width: portrait ? "100%" : 0.5,
                      height: portrait ? 0.5 : "100%",
                    }}
                  />
                }
                itemOne={
                  <img
                    src={
                      files[indexFileLeft || 0]?.preview ||
                      "https://er--test-public.s3.fr-par.scw.cloud/upscaled_1.webp"
                    }
                    alt="test"
                    className="w-full"
                  />
                }
                itemTwo={
                  <img
                    src={
                      files[indexFileRight !== null ? indexFileRight : 1]
                        ?.preview ||
                      "https://er--test-public.s3.fr-par.scw.cloud/upscaled_2.webp"
                    }
                    className="w-full"
                    alt="test"
                  />
                }
              />
            </TransformComponent>
          </TransformWrapper>
        </div>

        <div className="flex  w-full max-w-[64rem]">
          <DropZone
            text="Left: Drop or select"
            onDropCallback={(f: File[]) => addFiles(f, "left")}
          />
          <DropZone
            text="Right: Drop or select"
            onDropCallback={(f: File[]) => addFiles(f, "right")}
          />
        </div>

        <div className="flex  w-full max-w-[64rem]">
          <aside className="flex flex-col w-full p-3">{thumbsLeft}</aside>
          <aside className="flex flex-col w-full p-3">{thumbsRight}</aside>
        </div>
      </div>
    </main>
  );
}
