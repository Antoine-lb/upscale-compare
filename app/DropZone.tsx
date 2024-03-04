/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const DropZone = ({ onDropCallback }) => {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      onDropCallback(acceptedFiles);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <section className=" bg-slate-600">
      <div
        {...getRootProps({ className: "dropzone" })}
        className="bg-purple-800 rounded p-5"
      >
        <input {...getInputProps()} />
        <p>Drag drop some files here, or click to select files</p>
      </div>
    </section>
  );
};

export default DropZone;
