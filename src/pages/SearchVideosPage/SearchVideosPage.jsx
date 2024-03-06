import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useYoutubeApi } from '../../context/YoutubeApiContext';
import { compactNumberFormatter, dateFormatter } from '../../utility/format';
import { replaceHtmlEntities } from '../../utility/replace';
import {
  extractChannelIdList,
  extractVideoIdList,
} from '../../utility/extract';
import VideoThumbnail from '../../components/VideoThumbnail';
import ChannelThumbnail from '../../components/ChannelThumbnail';
import useWindowSize from '../../hooks/useWindowSize';

export default function SearchVideosPage() {
  const { keyword } = useParams();
  const { youtube } = useYoutubeApi();
  const {
    isFetching: isSearchFetching,
    isLoading: isSearchLoading,
    isError: isSearchError,
    data: videos,
  } = useQuery({
    queryKey: ['search videos', keyword],
    queryFn: () => youtube.search(keyword),
  });

  const {
    isFetching: isVideoDetailsFetching,
    isLoading: isVideoDetailsLoading,
    isError: isVideoDetailsError,
    data: videoDetails,
  } = useQuery({
    queryKey: ['video details', keyword],
    queryFn: () => youtube.videos(extractVideoIdList(videos)),
    enabled: !!videos,
  });

  const {
    isFetching: isChannelsFetching,
    isLoading: isChannelsLoading,
    isError: isChannelsError,
    data: channels,
  } = useQuery({
    queryKey: ['channels', keyword],
    queryFn: () => youtube.channels(extractChannelIdList(videoDetails)),
    enabled: !!videoDetails,
  });

  const navigate = useNavigate();
  const windowSize = useWindowSize();

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
  if (isSearchFetching || isVideoDetailsFetching || isChannelsFetching)
    return <p>Fetching...</p>;
  if (isSearchError || isVideoDetailsError || isChannelsError)
    return <p>Something is wrong!</p>;

  return (
    <main className="flex flex-col w-full sm:max-lg:px-2">
      {videoDetails.map((video) => {
        if (windowSize.width > 640) {
          // 브라우저 width가 640px 보다 클 때 렌더링
          return (
            <section
              key={video.id}
              className="flex mb-4 cursor-pointer"
              onClick={() => handleClick(video.id, video)}
            >
              <VideoThumbnail
                className={`shrink-0 rounded-xl w-[${video.snippet.thumbnails.medium.width}px] h-[${video.snippet.thumbnails.medium.height}px]`}
                video={video}
                maxres={false}
              />

              <div className="ml-4">
                <div className="flex flex-col">
                  <h2 className="font-bold line-clamp-1">
                    {replaceHtmlEntities(video.snippet.title)}
                  </h2>
                  <p className="text-sm text-zinc-300 line-clamp-1">
                    조회수{' '}
                    {compactNumberFormatter.format(video.statistics.viewCount)}
                    회 • {dateFormatter(new Date(video.snippet.publishedAt))}
                  </p>
                  <div className="flex items-center">
                    {channels.map((channel) => {
                      if (channel.id === video.snippet.channelId) {
                        return (
                          <ChannelThumbnail
                            key={channel.id}
                            className={'w-7 h-7 m-2 rounded-full'}
                            channel={channel}
                          />
                        );
                      }
                      return null;
                    })}
                    <p className="text-sm text-zinc-300 line-clamp-1">
                      {video.snippet.channelTitle}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-zinc-300 line-clamp-1">
                  {video.snippet.description}
                </p>
              </div>
            </section>
          );
        } else {
          // 브라우저가 width가 640px보다 작을 때 렌더링
          return (
            <section
              key={video.id}
              className="flex flex-col mb-4 cursor-pointer"
              onClick={() => handleClick(video.id, video)}
            >
              <VideoThumbnail
                className={'shrink-0 w-full'}
                video={video}
                maxres={true}
              />

              <div className="m-2">
                <div className="flex">
                  {channels.map((channel) => {
                    if (channel.id === video.snippet.channelId) {
                      return (
                        <ChannelThumbnail
                          key={channel.id}
                          className={'w-8 h-8 my-1 mx-2 rounded-full'}
                          channel={channel}
                        />
                      );
                    }
                    return null;
                  })}
                  <div className="flex flex-col">
                    <h2 className="text-sm font-bold line-clamp-2">
                      {replaceHtmlEntities(video.snippet.title)}
                    </h2>
                    <div className="flex">
                      <p className="text-xs text-zinc-300 line-clamp-1">
                        {video.snippet.channelTitle}&nbsp;•&nbsp;
                      </p>
                      <p className="text-xs text-zinc-300 line-clamp-1">
                        조회수{' '}
                        {compactNumberFormatter.format(
                          video.statistics.viewCount
                        )}
                        회 •{' '}
                        {dateFormatter(new Date(video.snippet.publishedAt))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        }
      })}
    </main>
  );
}
