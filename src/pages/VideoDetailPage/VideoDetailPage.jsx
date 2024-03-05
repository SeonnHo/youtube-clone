import { useLocation } from 'react-router-dom';
import RecommendationVideo from './RecommendationVideo/RecommendationVideo';
import { useYoutubeApi } from '../../context/YoutubeApiContext';
import { useQuery } from '@tanstack/react-query';
import { extractChannelIdList } from '../../utility/extract';
import Video from './Video/Video';
import Comment from './Comment/Comment';
import VideoInfo from './VideoInfo/VideoInfo';
import useWindowSize from '../../hooks/useWindowSize';
import { useEffect } from 'react';

export default function VideoDetailPage() {
  const imageList = [
    'https://cdn.pixabay.com/photo/2023/11/06/06/53/watermelon-8368960_1280.png',
    'https://cdn.pixabay.com/photo/2024/02/21/08/44/woman-8587090_1280.png',
    'https://cdn.pixabay.com/photo/2024/02/02/22/05/audio-8549150_1280.jpg',
    'https://cdn.pixabay.com/photo/2023/07/30/11/39/girl-8158685_1280.jpg',
    'https://cdn.pixabay.com/photo/2023/11/24/18/46/forest-8410493_1280.jpg',
    'https://cdn.pixabay.com/photo/2023/06/19/05/53/temple-8073501_1280.png',
    'https://cdn.pixabay.com/photo/2023/12/07/11/04/girl-8435329_960_720.png',
    'https://cdn.pixabay.com/photo/2024/01/01/13/55/snow-8481377_1280.jpg',
  ];
  const { state } = useLocation();
  const windowSize = useWindowSize();

  const { youtube } = useYoutubeApi();
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

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [state]);

  if (isVideosLoading || isChannelsLoading) return <p>Loading...</p>;
  if (isVideosFetching || isChannelsFetching) return <p>Fetching...</p>;
  if (isVideosError || isChannelsError) return <p>Something is wrong!</p>;

  if (windowSize.width < 1024) {
    return (
      <main className="w-full flex-col">
        <section className="aspect-video max-md:sticky max-md:top-0">
          <Video video={state.video} />
        </section>
        <section className="w-full flex flex-col mb-8">
          <VideoInfo video={state.video} channel={state.channel} />
        </section>
        <section className="mb-4">
          <p className="text-xl font-bold my-6 max-lg:my-4 max-lg:px-2">
            댓글 {state.video.statistics.commentCount}개
          </p>
          {imageList.map((src) => {
            return <Comment video={state.video} src={src} />;
          })}
        </section>
        <section className="flex flex-col px-2">
          {videos.map((video) => {
            return (
              <RecommendationVideo
                key={video.id}
                video={video}
                channels={channels}
              />
            );
          })}
        </section>
      </main>
    );
  } else {
    return (
      <main className="w-full flex">
        <section className="w-full flex flex-col mr-6">
          <section className="aspect-video">
            <Video video={state.video} />
          </section>
          <section className="w-full mb-0">
            <VideoInfo video={state.video} channel={state.channel} />
          </section>
          <section className="mb-4">
            <p className="text-xl font-bold my-6 max-lg:my-4 max-lg:px-2">
              댓글 {state.video.statistics.commentCount}개
            </p>
            {imageList.map((src) => {
              return <Comment key={src} video={state.video} src={src} />;
            })}
          </section>
        </section>
        <section className="flex flex-col">
          {videos.map((video) => {
            return (
              <RecommendationVideo
                key={video.id}
                video={video}
                channels={channels}
              />
            );
          })}
        </section>
      </main>
    );
  }
}
