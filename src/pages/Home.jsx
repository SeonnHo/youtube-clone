import React from 'react';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { youtube } = useYoutubeApi();
  const navigate = useNavigate();
  const {
    isLoading: isVideosLoading,
    isError: isVideosError,
    data: videos,
  } = useQuery({
    queryKey: ['popular videos'],
    queryFn: () => youtube.search(),
  });

  const {
    isLoading: isChannelsLoading,
    isError: isChannelsError,
    data: channels,
  } = useQuery({
    queryKey: ['channels'],
    queryFn: () => youtube.channels(extractChannelIds(videos)),
    enabled: !!videos,
  });

  const compactNumberFormatter = new Intl.NumberFormat('ko', {
    notation: 'compact',
  });

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

  const modifyImageUrl = (originalUrl) => {
    const newUrl = originalUrl.replace('/mqdefault.jpg', '/maxresdefault.jpg');
    return newUrl;
  };

  const decodeHtmlEntities = (text) => {
    return text
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"');
  };

  const extractChannelIds = (videos) => {
    let videoIdList = [];
    videos.map((video) => videoIdList.push(video.snippet.channelId));
    return videoIdList;
  };

  const usedChannelIds = [];

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

  if (isVideosLoading || isChannelsLoading) return <p>Loading...</p>;
  if (isVideosError || isChannelsError) return <p>Something is wrong!</p>;

  return (
    <main className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 w-full max-sm:flex max-sm:flex-col">
      {videos.map((video) => {
        return (
          <section
            className="flex flex-col max-sm:mb-2 cursor-pointer"
            key={video.id}
            onClick={() => handleClick(video.id, video)}
          >
            <img
              className="rounded-xl max-sm:hidden"
              src={video.snippet.thumbnails.medium.url}
              alt="thumbnail"
              width={video.snippet.thumbnails.medium.width}
              height={video.snippet.thumbnails.medium.height}
            />
            <img
              className="sm:hidden w-full"
              src={modifyImageUrl(video.snippet.thumbnails.medium.url)}
              alt="thumbnail"
            />
            <div className="max-sm:m-2 my-2 flex">
              {channels.map((channel) => {
                if (usedChannelIds.includes(channel.id)) {
                  return null;
                }
                if (channel.id === video.snippet.channelId) {
                  usedChannelIds.push(channel.id);
                  return (
                    <img
                      key={channel.id}
                      className="w-8 h-8 my-1 mx-2 rounded-full"
                      src={channel.snippet.thumbnails.default.url}
                      alt="channel thumbnails"
                    />
                  );
                }
                return null;
              })}
              <div>
                <h2 className="max-sm:text-sm font-bold line-clamp-2">
                  {decodeHtmlEntities(video.snippet.title)}
                </h2>
                <div className="max-sm:flex">
                  <p className="text-sm max-sm:text-xs text-zinc-300 line-clamp-1 max-sm:hidden">
                    {video.snippet.channelTitle}
                  </p>
                  <p className="text-sm max-sm:text-xs text-zinc-300 line-clamp-1 sm:hidden">
                    {video.snippet.channelTitle}&nbsp;•&nbsp;
                  </p>
                  <p className="text-sm max-sm:text-xs text-zinc-300 line-clamp-1">
                    조회수{' '}
                    {compactNumberFormatter.format(video.statistics.viewCount)}
                    회 • {detailDate(new Date(video.snippet.publishedAt))}
                  </p>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </main>
  );
}
