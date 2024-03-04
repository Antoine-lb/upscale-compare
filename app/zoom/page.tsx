"use client";

import React, { useRef, useState } from "react";

const ImageZoom = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  const handleWheel = (event) => {
    const speed = 0.5;
    let target = { x: 0, y: 0 };
    let pointer = { x: 0, y: 0 };

    let size = {
      w: imageRef.current.offsetWidth,
      h: imageRef.current.offsetHeight,
    };

    pointer.x = event.pageX - containerRef.current.offsetLeft;
    pointer.y = event.pageY - containerRef.current.offsetTop;

    if (pointer.x <= 0 && pointer.y <= 0) return;
    if (size.h <= 0 && size.w <= 0) return;

    target.x = (pointer.x - pos.x) / scale;
    target.y = (pointer.y - pos.y) / scale;

    const delta = Math.max(-1, Math.min(1, event.deltaY));
    setScale((prevScale) => prevScale + -delta * speed * prevScale);

    // had to to this bc it was always one step late bc of react state
    let tmp_scale = scale;
    tmp_scale += -1 * Math.max(-1, Math.min(1, event.deltaY)) * speed * scale;

    // Uncomment to constrain scale
    // const maxScale = 4;
    // const minScale = 1;
    // setScale((prevScale) => Math.max(minScale, Math.min(maxScale, prevScale)));

    setPos({
      x: -target.x * tmp_scale + pointer.x,
      y: -target.y * tmp_scale + pointer.y,
    });

    // Uncomment for keeping the image within the area (works with min scale = 1)
    // if (pos.x > 0) setPos({ ...pos, x: 0 });
    // if (pos.x + size.w * tmp_scale < size.w)
    //   setPos({ ...pos, x: -size.w * (tmp_scale - 1) });
    // if (pos.y > 0) setPos({ ...pos, y: 0 });
    // if (pos.y + size.h * tmp_scale < size.h)
    //   setPos({ ...pos, y: -size.h * (tmp_scale - 1) });

    imageRef.current.style.transform = `translate(${pos.x}px,${pos.y}px) scale(${scale},${scale})`;
  };

  const handleImageLoad = () => {
    console.log("handleImageLoad", handleImageLoad);
  };

  return (
    <div className="container" ref={containerRef} onWheel={handleWheel}>
      <div className="image" ref={imageRef} onLoad={handleImageLoad}>
        <img src="https://picsum.photos/400/400" alt="Zoomable Image" />
      </div>
      <style jsx>{`
        .container {
          width: 400px;
          height: 400px;
          overflow: hidden;
          outline: 1px solid gray;
        }

        .image {
          width: 100%;
          height: 100%;
          transition: transform 0.3s;
          transform-origin: 0 0;
        }

        img {
          width: auto;
          height: auto;
          max-width: 100%;
        }
      `}</style>
    </div>
  );
};

export default ImageZoom;
