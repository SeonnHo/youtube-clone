import React, { useEffect, useRef, useState } from 'react';
import {
  compactNumberFormatter,
  dateFormatter,
} from '../../../../utility/format';

export default function Description({ video }) {
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
    });

    return () => {
      setIsOverflow(false);
      setIsShowMore(false);
    };
  }, [video]);

  return (
    <div
      className={`w-full flex flex-col bg-zinc-800 rounded-2xl p-4 ${
        isOverflow ? (isShowMore ? '' : 'max-h-[160px]') : ''
      }`}
      ref={ref}
    >
      <p className="text-sm font-bold">
        조회수 {compactNumberFormatter.format(video.statistics.viewCount)}회{' '}
        {dateFormatter(new Date(video.snippet.publishedAt))}
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
            isOverflow ? (isShowMore ? 'justify-start' : 'justify-end') : ''
          } text-sm text-zinc-500 font-bold`}
        >
          <button onClick={showMore}>
            {isShowMore ? '간략히' : '...더보기'}
          </button>
        </div>
      )}
    </div>
  );
}
