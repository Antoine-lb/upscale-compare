/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const ImageWithDropZone = ({
  onDropCallback,
  src,
}: {
  onDropCallback: (acceptedFiles: File[]) => void;
  src: string;
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      onDropCallback(acceptedFiles);
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <img
        src={src}
        alt="user uploaded image"
        className={`w-full ${isDragActive ? "opacity-50	" : ""}`}
      />
    </div>
  );
};

export default ImageWithDropZone;
