import React from 'react';
import { compactNumberFormatter } from '../../../../utility/format';

export default function Owner({ video, channel }) {
  const { channelTitle } = video.snippet;
  const { subscriberCount } = channel.statistics;
  const { thumbnails } = channel.snippet;
  return (
    <div className="flex flex-row my-3">
      <img
        className="w-12 h-12 rounded-full mr-3"
        src={thumbnails.default.url}
        alt="channel thumbnails"
      />
      <div className="flex flex-col justify-center">
        <p className="text-sm font-bold mb-1">{channelTitle}</p>
        <p className="text-xs text-zinc-300">
          구독자 {compactNumberFormatter.format(subscriberCount)}명
        </p>
      </div>
    </div>
  );
}
