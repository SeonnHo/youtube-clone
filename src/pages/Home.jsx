import React, { useEffect, useState } from 'react';

export default function Home() {
  const [videos, setVideos] = useState({
    items: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchVideosHandler = async () => {
    setIsLoading(true);
    const response = await fetch('data/popular.json');

    const data = await response.json();

    setVideos(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchVideosHandler();
  }, []);

  const compactNumberFormatter = new Intl.NumberFormat('ko', {
    notation: 'compact',
  });

  const detailDate = (a) => {
    const milliSeconds = new Date() - a;
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

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xl:gap-4 lg:gap-3 md:gap-2 sm:gap-1 w-4/5">
      {videos.items.map((video) => {
        return (
          <div className="flex flex-col" key={video.id}>
            <img
              className="rounded-xl"
              src={video.snippet.thumbnails.medium.url}
              alt="thumbnail"
              width={video.snippet.thumbnails.medium.width}
              height={video.snippet.thumbnails.medium.height}
            />
            <div className="text-sm font-bold">
              <p>{video.snippet.title}</p>
              <p className="text-gray-500">{video.snippet.channelTitle}</p>
              <p className="text-gray-500">
                조회수{' '}
                {compactNumberFormatter.format(video.statistics.viewCount)}회 •{' '}
                {detailDate(new Date(video.snippet.publishedAt))}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
