import React from 'react';
import { compactNumberFormatter, dateFormatter } from '../../../utility/format';
import { replaceHtmlEntities } from '../../../utility/replace';

export default function VideoInfo({ video }) {
  const { title, channelTitle, publishedAt } = video.snippet;
  const { viewCount } = video.statistics;
  return (
    <div>
      <h2 className="max-sm:text-sm font-bold line-clamp-2">
        {replaceHtmlEntities(title)}
      </h2>
      <div className="max-sm:flex">
        {/**
         * width가 640px 미만일 때 숨김
         */}
        <p className="text-sm max-sm:text-xs text-zinc-300 line-clamp-1 max-sm:hidden">
          {channelTitle}
        </p>

        {/**
         * width가 640px 이상일 때 숨김
         */}
        <p className="text-sm max-sm:text-xs text-zinc-300 line-clamp-1 sm:hidden">
          {channelTitle}&nbsp;•&nbsp;
        </p>
        <p className="text-sm max-sm:text-xs text-zinc-300 line-clamp-1">
          조회수 {compactNumberFormatter.format(viewCount)}회 •{' '}
          {dateFormatter(new Date(publishedAt))}
        </p>
      </div>
    </div>
  );
}
