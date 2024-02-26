import React from 'react';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { compactNumberFormatter, dateFormatter } from '../utility/format';
import {
  replaceHtmlEntities,
  replaceImageWithMaxRes,
} from '../utility/replace';
import { extractChannelIdList } from '../utility/extract';

export default function Home() {
  const { youtube } = useYoutubeApi();
  const navigate = useNavigate();
  const {
    isFetching: isVideosFetching,
    isLoading: isVideosLoading,
    isError: isVideosError,
    data: videos,
  } = useQuery({
    queryKey: ['popular videos'],
    queryFn: () => youtube.search(),
  });

  const {
    isFetching: isChannelsFetching,
    isLoading: isChannelsLoading,
    isError: isChannelsError,
    data: channels,
  } = useQuery({
    queryKey: ['channels'],
    queryFn: () => youtube.channels(extractChannelIdList(videos)),
    enabled: !!videos,
  });

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
  if (isVideosFetching || isChannelsFetching) return <p>Fetching...</p>;
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
              src={replaceImageWithMaxRes(video.snippet.thumbnails.medium.url)}
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
                  {replaceHtmlEntities(video.snippet.title)}
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
                    회 • {dateFormatter(new Date(video.snippet.publishedAt))}
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
