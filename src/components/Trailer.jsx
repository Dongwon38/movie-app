import React from "react";

const Trailer = ({ videoKey }) => {
  const videoUrl = `https://www.youtube.com/embed/${videoKey}`;

  return (
    <div className="trailer">
      <iframe
        width="560"
        height="315"
        src={videoUrl}
        title="YouTube video player"
        allowFullScreen
      ></iframe>
    </div>
  );
};
export default Trailer;
