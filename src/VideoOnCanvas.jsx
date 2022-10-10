import React, { useEffect, useCallback } from "react";
import { AbsoluteFill, Video } from "remotion";

export const VideoOnCanvas = ({
  height,
  width,
  startFrom,
  canvasRef,
  imageRef,
  durationInFrames,
  src,
  dataId
}) => {
  // const [videoRef, setVideoRef] = useHookWithRefCallback();
  const videoRef = React.useRef(null);

  /** video frame transformation */
  // Process a frame
  const onVideoFrame = useCallback(() => {
    console.log("10000");
    if (!canvasRef.current || !videoRef.current) {
      return;
    }
    console.log("10001");
    const context = canvasRef.current.getContext("2d");
    if (!context) {
      return;
    }
    console.log("10002");
    context.filter = "grayscale(100%)";
    context.drawImage(videoRef.current, 0, 0, width, height);
    // imageRef.current.cache();
  }, [height, width]);

  // Synchronize the video with the canvas
  useEffect(() => {
    const { current } = videoRef;
    if (!current?.requestVideoFrameCallback) {
      return;
    }
    let handle = 0;
    const callback = () => {
      onVideoFrame();
      handle = current.requestVideoFrameCallback(callback);
    };
    callback();
    return () => {
      current.cancelVideoFrameCallback(handle);
    };
  }, [onVideoFrame]);

  return (
    <AbsoluteFill>
      <Video
        ref={videoRef}
        // Hide the original video tag
        style={{ opacity: 0 }}
        startFrom={startFrom}
        endAt={durationInFrames}
        src={src}
        crossOrigin="anonymous"
        data-id={dataId}
        id={dataId}
      />
      <AbsoluteFill style={{ opacity: 1 }}>
        <canvas ref={canvasRef} width={width} height={height} id={dataId} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
