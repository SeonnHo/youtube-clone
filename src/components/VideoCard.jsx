import React, { useEffect, useRef, useState } from 'react';

export default function VideoCard({ video, channel }) {
  const [isShowMore, setIsShowMore] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const descriptionRef = useRef(null);
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

  const showMoreOrShort = () => {
    setIsShowMore((prev) => !prev);
  };

  useEffect(() => {
    const descriptionHeight = descriptionRef.current?.offsetHeight;
    if (descriptionHeight > 160) {
      console.log('if true, ' + descriptionHeight);
      setIsOverflow(true);
    } else {
      console.log('if false, ' + descriptionHeight);
      setIsOverflow(false);
    }
    setIsShowMore(false);
  }, [video]);

  console.log(video);
  console.log(channel);

  return (
    <div className="w-full flex flex-col mr-6 mb-8">
      <iframe
        className="aspect-video rounded-2xl"
        src={`https://www.youtube.com/embed/${video.id}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
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
            구독자 {convertNumber(channel.statistics.subscriberCount)}명
          </p>
        </div>
      </div>
      <div
        className={`w-full flex flex-col ${
          isOverflow ? (isShowMore ? '' : 'h-40') : ''
        } bg-zinc-800 rounded-2xl p-4`}
        ref={descriptionRef}
      >
        <p className="text-zinc-300 text-sm font-bold">
          조회수 {convertNumber(video.statistics.viewCount)}회{' '}
          {detailDate(new Date(video.snippet.publishedAt))}
        </p>
        <p
          className={`text-zinc-300 text-sm font-bold whitespace-pre-wrap ${
            isOverflow ? (isShowMore ? 'mb-4' : 'line-clamp-4') : ''
          }`}
        >
          {video.snippet.description}
        </p>
        {isOverflow && (
          <div
            className={`flex ${
              isShowMore ? 'justify-start' : 'justify-end'
            } text-sm text-zinc-500 font-bold`}
          >
            <button onClick={showMoreOrShort}>
              {isShowMore ? '간략히' : '...더보기'}
            </button>
          </div>
        )}
      </div>
      <p className="text-xl font-bold my-6">
        댓글 {video.statistics.commentCount}개
      </p>
    </div>
  );
}
