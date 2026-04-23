"use client";

// turn off SSR
import dynamic from "next/dynamic";
import { useState } from "react";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";

// Dynamic import — disables SSR
const LeafletMap = dynamic(() => import("./LeafletMap.tsx"), {
  ssr: false,
});

const WorldMap = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div
      className={`worldMapContainer ${isFullscreen ? "worldMapContainer--fullscreen" : ""}`}
    >
      <button
        className="worldMapContainer__fullscreenBtn"
        onClick={() => setIsFullscreen(!isFullscreen)}
      >
        {isFullscreen ? <MdFullscreenExit /> : <MdFullscreen />}
      </button>
      <LeafletMap />
    </div>
  );
};

export default WorldMap;
