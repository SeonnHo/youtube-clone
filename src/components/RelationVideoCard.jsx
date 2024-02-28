import React from 'react';
import { useNavigate } from 'react-router-dom';
import { compactNumberFormatter, dateFormatter } from '../utility/format';

export default function RelationVideoCard({ video, channels }) {
  const navigate = useNavigate();

  const handleClick = (id, video) => {
    let resultChannel;
    channels.forEach((channel) => {
      if (video.snippet.channelId === channel.id) {
        resultChannel = channel;
      }
    });
    navigate(`/videos/watch/${id}`, {
      state: { video, channel: resultChannel },
    });
  };

  return (
    <div
      className="flex w-[400px] h-[100px] flex-shrink-0 mb-4 cursor-pointer"
      onClick={() => handleClick(video.id, video)}
    >
      <img
        className="h-full rounded-lg"
        src={video.snippet.thumbnails.medium.url}
        alt="thumbnail"
      />
      <div className="flex flex-col pl-2">
        <h4 className="text-sm font-bold line-clamp-2 mb-2">
          {video.snippet.title}
        </h4>
        <h5 className="text-xs font-bold text-zinc-400 mb-1">
          {video.snippet.channelTitle}
        </h5>
        <h6 className="text-xs font-bold text-zinc-400">
          조회수 {compactNumberFormatter.format(video.statistics.viewCount)}
          회&nbsp;•&nbsp;
          {dateFormatter(new Date(video.snippet.publishedAt))}
        </h6>
      </div>
    </div>
  );
}
