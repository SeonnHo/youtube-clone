import React from 'react';

export default function ChannelThumbnail({ channel }) {
  return (
    <img
      className="w-8 h-8 my-1 mx-2 rounded-full"
      src={channel.snippet.thumbnails.default.url}
      alt="channel thumbnails"
    />
  );
}
