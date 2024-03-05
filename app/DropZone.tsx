/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const DropZone = ({
  onDropCallback,
  text,
}: {
  onDropCallback: (acceptedFiles: File[]) => void;
  text: string;
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      onDropCallback(acceptedFiles);
    },
  });

  return (
    <section className=" w-full pt-5">
      <div
        {...getRootProps({ className: "dropzone" })}
        className="bg-white/10 rounded-2xl flex justify-center items-center h-20 mx-6 cursor-pointer border-2 border-dashed border-white/20 hover:border-white/40 transition-all duration-300 ease-in-out"
      >
        <input {...getInputProps()} />
        <p>{text}</p>
      </div>
    </section>
  );
};

export default DropZone;
