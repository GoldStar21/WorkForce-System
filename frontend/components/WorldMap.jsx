"use client";

// turn off SSR
import dynamic from "next/dynamic";

// Dynamic import — disables SSR
const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
});

const WorldMap = () => {
  return (
    <div className="worldMapContainer">
      <LeafletMap />
    </div>
  );
};

export default WorldMap;
