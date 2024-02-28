import React from 'react';
import { compactNumberFormatter } from '../utility/format';
import VideoDescription from './VideoDescription';

export default function VideoCard({ video, channel }) {
  return (
    <div className="w-full flex flex-col mr-6 mb-8">
      <iframe
        className="aspect-video rounded-2xl"
        src={`https://www.youtube.com/embed/${video.id}?autoplay=1&modestbranding=1`}
        title="Youtube video player"
        allowFullScreen
      />
      <h2 className="text-xl font-bold mt-4">{video.snippet.title}</h2>
      <div className="flex flex-row my-3">
        <img
          className="w-12 h-12 rounded-full mr-3"
          src={channel.snippet.thumbnails.default.url}
          alt="channel thumbnails"
        />
        <div className="flex flex-col justify-center">
          <h3 className="text-sm font-bold mb-1">
            {video.snippet.channelTitle}
          </h3>
          <p className="text-xs text-zinc-300">
            구독자{' '}
            {compactNumberFormatter.format(channel.statistics.subscriberCount)}
            명
          </p>
        </div>
      </div>
      <VideoDescription video={video} />

      <p className="text-xl font-bold my-6">
        댓글 {video.statistics.commentCount}개
      </p>
    </div>
  );
}
