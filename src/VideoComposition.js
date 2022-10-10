import React from "react";
import { VideoOnCanvas } from "./VideoOnCanvas";
import {
  Sequence,
  useVideoConfig,
  AbsoluteFill,
  useCurrentFrame
} from "remotion";

export const VideoComposition = ({ play, size, data }) => {
  const { width, height } = useVideoConfig();
  //   const [imageRef, setImageRef] = useHookWithRefCallback();
  console.log("currentFrame", useCurrentFrame());
  const imageRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  console.log("canvasRef", canvasRef);
  console.log("imageRef", imageRef);
  return (
    <Sequence from={0}>
      <AbsoluteFill>
        {data.map((val, idx) => {
          return (
            <Sequence key={val.id} from={val.start} durationInFrames={val.end}>
              <AbsoluteFill>
                <VideoOnCanvas
                  width={width}
                  height={height}
                  startFrom={val.start}
                  durationInFrames={val.end}
                  canvasRef={canvasRef}
                  imageRef={imageRef}
                  src={val.src}
                  dataId={val.id}
                />
              </AbsoluteFill>
            </Sequence>
          );
        })}
      </AbsoluteFill>
    </Sequence>
  );
};
