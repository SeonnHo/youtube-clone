import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useYoutubeApi } from '../context/YoutubeApiContext';

export default function Videos() {
  const { keyword } = useParams();
  const { youtube } = useYoutubeApi();
  const {
    isLoading: isSearchLoading,
    isError: isSearchError,
    data: videos,
  } = useQuery({
    queryKey: ['search videos', keyword],
    queryFn: () => youtube.search(keyword),
  });

  const {
    isLoading: isVideoDetailsLoading,
    isError: isVideoDetailsError,
    data: videoDetails,
  } = useQuery({
    queryKey: ['video details'],
    queryFn: () => youtube.videos(extractVideoIds(videos)),
    enabled: !!videos,
  });

  const {
    isLoading: isChannelsLoading,
    isError: isChannelsError,
    data: channels,
  } = useQuery({
    queryKey: ['channels'],
    queryFn: () => youtube.channels(extractChannelIds(videoDetails)),
    enabled: !!videoDetails,
  });

  const navigate = useNavigate();

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

  const extractVideoIds = (videos) => {
    let videoIdList = [];
    videos.map((video) => videoIdList.push(video.id));
    return videoIdList;
  };

  const extractChannelIds = (videos) => {
    let videoIdList = [];
    videos.map((video) => videoIdList.push(video.snippet.channelId));
    return videoIdList;
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

  if (isSearchLoading || isVideoDetailsLoading || isChannelsLoading)
    return <p>Loading...</p>;
  if (isSearchError || isVideoDetailsError || isChannelsError)
    return <p>Something is wrong!</p>;

  return (
    <main className="flex flex-col w-full">
      {videoDetails.map((video) => {
        return (
          <section
            key={video.id}
            className="flex max-sm:flex-col mb-4 cursor-pointer"
            onClick={() => handleClick(video.id, video)}
          >
            <img
              className={`shrink-0 rounded-xl max-sm:hidden`}
              src={modifyImageUrl(video.snippet.thumbnails.medium.url)}
              alt="thumbnail"
              width={video.snippet.thumbnails.medium.width}
              height={video.snippet.thumbnails.medium.height}
            />
            <img
              className={`shrink-0 w-full sm:hidden`}
              src={modifyImageUrl(video.snippet.thumbnails.medium.url)}
              alt="thumbnail"
            />

            <div className="ml-4 max-sm:m-2">
              <div className="flex sm:flex-col">
                {channels.map((channel) => {
                  if (channel.id === video.snippet.channelId) {
                    return (
                      <img
                        key={channel.id}
                        className="w-8 h-8 my-1 mx-2 rounded-full sm:hidden"
                        src={channel.snippet.thumbnails.default.url}
                        alt="channel thumbnails"
                      />
                    );
                  }
                  return null;
                })}
                <div className="max-sm:flex max-sm:flex-col">
                  <h2 className="max-sm:text-sm font-bold line-clamp-1 max-sm:line-clamp-2">
                    {decodeHtmlEntities(video.snippet.title)}
                  </h2>
                  <div className="max-sm:flex">
                    <p className="text-sm max-sm:text-xs text-zinc-300 line-clamp-1 sm:hidden">
                      {video.snippet.channelTitle}&nbsp;•&nbsp;
                    </p>
                    <p className="text-sm max-sm:text-xs text-zinc-300 line-clamp-1">
                      조회수{' '}
                      {compactNumberFormatter.format(
                        video.statistics.viewCount
                      )}
                      회 • {detailDate(new Date(video.snippet.publishedAt))}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {channels.map((channel) => {
                      if (channel.id === video.snippet.channelId) {
                        return (
                          <img
                            key={channel.id}
                            className="w-7 h-7 m-2 rounded-full max-sm:hidden"
                            src={channel.snippet.thumbnails.default.url}
                            alt="channel thumbnails"
                          />
                        );
                      }
                      return null;
                    })}
                    <p className="text-sm max-sm:text-xs text-zinc-300 line-clamp-1 max-sm:hidden">
                      {video.snippet.channelTitle}
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-sm max-sm:text-xs text-zinc-300 line-clamp-1 max-sm:hidden">
                {video.snippet.description}
              </p>
            </div>
          </section>
        );
      })}
    </main>
  );
}
