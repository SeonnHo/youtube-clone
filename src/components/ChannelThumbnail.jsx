import React from 'react';

export default function ChannelThumbnail({ channel, className }) {
  const { thumbnails } = channel.snippet;
  return (
    <img
      className={className}
      src={thumbnails.default.url}
      alt="channel thumbnails"
    />
  );
}
