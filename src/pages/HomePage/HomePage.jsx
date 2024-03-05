import React from 'react';
import { useYoutubeApi } from '../../context/YoutubeApiContext';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { extractChannelIdList } from '../../utility/extract';
import VideoThumbnail from '../../components/VideoThumbnail';
import ChannelThumbnail from '../../components/ChannelThumbnail';
import VideoInfo from './VideoInfo/VideoInfo';
import useWindowSize from '../../hooks/useWindowSize';

export default function HomePage() {
  const { youtube } = useYoutubeApi();
  const windowSize = useWindowSize();
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
    queryKey: ['popular video channels'],
    queryFn: () => youtube.channels(extractChannelIdList(videos)),
    enabled: !!videos,
  });

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
    <main className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 w-full max-sm:flex max-sm:flex-col sm:max-lg:px-4">
      {videos.map((video) => {
        return (
          <section
            className="flex flex-col max-sm:mb-2 cursor-pointer"
            key={video.id}
            onClick={() => handleClick(video.id, video)}
          >
            {/**
             * 640px 이상일 때 렌더링
             */}
            {windowSize.width > 640 && (
              <VideoThumbnail
                video={video}
                className={'rounded-xl'}
                maxres={false}
              />
            )}

            {/**
             * 640px 미만일 때 렌더링
             */}
            {windowSize.width < 640 && (
              <VideoThumbnail
                video={video}
                className={'w-full'}
                maxres={true}
              />
            )}

            <div className="max-sm:m-2 my-2 flex">
              {channels.map((channel) => {
                if (channel.id === video.snippet.channelId) {
                  return (
                    <ChannelThumbnail
                      key={channel.id}
                      channel={channel}
                      className={'w-8 h-8 my-1 mx-2 rounded-full'}
                    />
                  );
                }
                return null;
              })}
              <VideoInfo video={video} />
            </div>
          </section>
        );
      })}
    </main>
  );
}
