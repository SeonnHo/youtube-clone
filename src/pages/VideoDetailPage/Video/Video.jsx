import React from 'react';

export default function Video({ video }) {
  return (
    <iframe
      className="w-full h-full rounded-2xl max-lg:rounded-none"
      src={`https://www.youtube.com/embed/${video.id}?autoplay=1&modestbranding=1`}
      title="Youtube video player"
      allowFullScreen
    />
  );
}
