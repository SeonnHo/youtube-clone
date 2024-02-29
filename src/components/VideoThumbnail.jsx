import React from 'react';
import { replaceImageWithMaxRes } from '../utility/replace';

export default function VideoThumbnail({ video, className, maxres }) {
  const { thumbnails } = video.snippet;
  return (
    <img
      className={className}
      src={
        maxres
          ? replaceImageWithMaxRes(thumbnails.medium.url)
          : thumbnails.medium.url
      }
      alt="thumbnail"
    />
  );
}
