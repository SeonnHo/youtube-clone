import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RelationVideoCard({ video, channels }) {
  const navigate = useNavigate();
  const modifyImageUrl = (originalUrl) => {
    const newUrl = originalUrl.replace('/mqdefault.jpg', '/maxresdefault.jpg');
    return newUrl;
  };

  const convertNumber = (num) => {
    if (num >= 100000000)
      return parseFloat((num / 100000000).toFixed(1)) + '억';
    if (num >= 10000) return parseFloat((num / 10000).toFixed(1)) + '만';
    if (num >= 1000) return parseFloat((num / 1000).toFixed(2)) + '천';
    return num.toString();
  };

  const detailDate = (date) => {
    const milliSeconds = new Date() - date;
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
  };

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

  useEffect(() => {
    console.log('relation component update!');
  }, [video]);

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
          조회수 {convertNumber(video.statistics.viewCount)}회&nbsp;•&nbsp;
          {detailDate(new Date(video.snippet.publishedAt))}
        </h6>
      </div>
    </div>
  );
}
