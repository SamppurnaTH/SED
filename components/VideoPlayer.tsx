import React from 'react';

interface VideoPlayerProps {
  src: string;
  onDownload: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, onDownload }) => {
  return (
    <div className="space-y-4">
      <video
        src={src}
        controls
        className="w-full rounded-lg shadow-lg border border-gray-200"
      >
        Your browser does not support the video tag.
      </video>
      <button
        onClick={onDownload}
        className="w-full bg-primary text-white font-poppins font-bold py-3 px-6 rounded-lg hover:bg-accent transition-all duration-300 shadow-sm"
      >
        Download Video
      </button>
    </div>
  );
};

export default VideoPlayer;
