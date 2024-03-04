import React, { useEffect, useRef, useState } from 'react';
import { compactNumberFormatter, dateFormatter } from '../../../utility/format';

export default function VideoInfo({ video, channel }) {
  const { title, channelTitle, publishedAt, description } = video.snippet;
  const { viewCount } = video.statistics;
  const { subscriberCount } = channel.statistics;
  const { thumbnails } = channel.snippet;

  const ref = useRef(null);

  const [isOverflow, setIsOverflow] = useState(false);
  const [isShowMore, setIsShowMore] = useState(false);

  const showMore = () => {
    setIsShowMore((prev) => !prev);
  };

  useEffect(() => {
    setTimeout(() => {
      if (ref.current.offsetHeight > 160) {
        setIsOverflow(true);
      } else {
        setIsOverflow(false);
      }
    }, 100);

    return () => {
      setIsOverflow(false);
      setIsShowMore(false);
    };
  }, [video]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="w-full text-xl font-bold mt-4 max-sm:px-2">{title}</h2>
      <div className="w-full flex flex-row my-3 max-sm:px-2">
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
      <div
        className={`w-full max-sm:w-[calc(100%-1rem)] flex flex-col bg-zinc-800 rounded-2xl p-4 ${
          isOverflow ? (isShowMore ? '' : 'max-h-[160px]') : ''
        }`}
        ref={ref}
      >
        <p className="text-sm font-bold">
          조회수 {compactNumberFormatter.format(viewCount)}회{' '}
          {dateFormatter(new Date(publishedAt))}
        </p>
        <p
          className={`text-zinc-300 text-sm font-bold whitespace-pre-wrap ${
            isOverflow ? (isShowMore ? 'mb-4' : 'line-clamp-4') : ''
          }`}
        >
          {description}
        </p>

        {isOverflow && (
          <div
            className={`flex ${
              isOverflow ? (isShowMore ? 'justify-start' : 'justify-end') : ''
            } text-sm text-zinc-500 font-bold`}
          >
            <button onClick={showMore}>
              {isShowMore ? '간략히' : '...더보기'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
