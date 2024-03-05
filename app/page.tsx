/* eslint-disable @next/next/no-img-element */
"use client";
import { useCallback, useState } from "react";
import DropZone from "./DropZone";
import ImageWithDropZone from "./ImageWithDropZone";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {
  ReactCompareSlider,
  ReactCompareSliderHandle,
} from "react-compare-slider";
import prettyBytes from "pretty-bytes";
import { aspect_ratio, getImageDimensions } from "./utils";

export default function Home() {
  const [files, setFiles] = useState<
    { file: File; preview: string; width: number; height: number }[]
  >([]);
  const [indexFileLeft, setIndexFileLeft] = useState<number | null>(null);
  const [indexFileRight, setIndexFileRight] = useState<number | null>(null);
  let portrait = false;

  const thumbsLeft = files.map((file, i) => (
    <button
      className={`flex items-center w-full min-h-24  mb-2 rounded-2xl  hover:bg-white/20 transition-all duration-300 ease-in-out ${
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
          <p className=" font-bold "> {prettyBytes(file.file.size)} </p>
          <p className="font-bold">
            {file.width}x{file.height}{" "}
            <span className="italic font-mono font-normal">
              ({aspect_ratio(file.width / file.height)[0]}:
              {aspect_ratio(file.width / file.height)[1]})
            </span>
          </p>
        </div>
      </div>
    </button>
  ));

  const thumbsRight = files.map((file, i) => (
    <button
      className={`flex items-center w-full min-h-24  mb-2 rounded-2xl  hover:bg-white/20 transition-all duration-300 ease-in-out ${
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
          <p className=" font-bold "> {prettyBytes(file.file.size)} </p>
          <p className="font-bold">
            {file.width}x{file.height}{" "}
            <span className="italic font-mono font-normal">
              ({aspect_ratio(file.width / file.height)[0]}:
              {aspect_ratio(file.width / file.height)[1]})
            </span>
          </p>
        </div>
      </div>
    </button>
  ));

  async function addFilesSync(
    acceptedFiles: File[],
    side: "left" | "right" | null
  ) {
    let i = 0;
    let filesWithPreviewArray = [];
    while (i < acceptedFiles.length) {
      const file = acceptedFiles[i];
      const wh = await getImageDimensions(file);

      filesWithPreviewArray.push({
        file,
        preview: URL.createObjectURL(file),
        width: wh.width,
        height: wh.height,
      });

      i++;
    }

    setFiles([...files, ...filesWithPreviewArray]);
    if (side === "left") {
      console.log("left files.length", files.length);
      setIndexFileLeft(files.length);
    }

    if (side === "right") {
      console.log("right files.length", files.length);
      setIndexFileRight(files.length);
    }
  }

  return (
    <main className=" min-h-screen">
      <div className="flex p-4 items-center  bg-gradient-to-b from-[#170320] from-10% to-emerald-500/0 to-50%">
        <img className=" w-16 rounded-xl" src="/us-logo.webp" alt="asdf" />
        <h1 className="pl-3 text-3xl font-bold text-white/70">
          Upscale compare
        </h1>
      </div>
      <img
        src="/drophere.svg"
        alt="drop here sign"
        className={`m-auto opacity-0 ${files.length == 0 ? "opacity-70" : ""}`}
      />
      <div className="flex  flex-col items-center justify-between p-24 pt-1 ">
        <div className="flex justify-center items-center cursor-col-resize  border border-[#822f8f] shadow-lg shadow-[#822f8f]/20">
          <TransformWrapper>
            <TransformComponent>
              <ReactCompareSlider
                handle={
                  <ReactCompareSliderHandle
                    portrait={portrait}
                    buttonStyle={{
                      display: "none",
                    }}
                    linesStyle={{
                      width: portrait ? "100%" : 0.5,
                      height: portrait ? 0.5 : "100%",
                    }}
                  />
                }
                itemOne={
                  <ImageWithDropZone
                    onDropCallback={(f: File[]) => addFilesSync(f, "left")}
                    src={
                      indexFileLeft !== null
                        ? files[indexFileLeft]?.preview
                        : "https://er--test-public.s3.fr-par.scw.cloud/upscaled_1.webp"
                    }
                  />
                }
                itemTwo={
                  <ImageWithDropZone
                    onDropCallback={(f: File[]) => addFilesSync(f, "right")}
                    src={
                      indexFileRight !== null
                        ? files[indexFileRight]?.preview
                        : "https://er--test-public.s3.fr-par.scw.cloud/upscaled_2.webp"
                    }
                  />
                }
              />
            </TransformComponent>
          </TransformWrapper>
        </div>

        <div className="flex  w-full max-w-[64rem]">
          <DropZone
            text="Left: Drop or select"
            onDropCallback={(f: File[]) => addFilesSync(f, "left")}
          />
          <DropZone
            text="Right: Drop or select"
            onDropCallback={(f: File[]) => addFilesSync(f, "right")}
          />
        </div>

        <div className="flex  w-full max-w-[64rem]">
          <aside className="flex flex-col w-full p-3">{thumbsLeft}</aside>
          <aside className="flex flex-col w-full p-3">{thumbsRight}</aside>
        </div>
      </div>
      <footer className="bg-[#100715] text-center py-10 mt-32">
        source code:{" "}
        <a
          className="underline"
          target="_blank"
          href="https://github.com/Antoine-lb/upscale-compare"
        >
          Github
        </a>
      </footer>
    </main>
  );
}
