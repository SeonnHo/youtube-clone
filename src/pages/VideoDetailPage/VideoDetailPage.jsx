import { useLocation } from 'react-router-dom';
import RecommendationVideo from './RecommendationVideo/RecommendationVideo';
import { useYoutubeApi } from '../../context/YoutubeApiContext';
import { useQuery } from '@tanstack/react-query';
import { extractChannelIdList } from '../../utility/extract';
import Video from './Video/Video';
import Comment from './Comment/Comment';
import VideoInfo from './VideoInfo/VideoInfo';

export default function VideoDetailPage() {
  const { state } = useLocation();

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

  if (isVideosLoading || isChannelsLoading) return <p>Loading...</p>;
  if (isVideosFetching || isChannelsFetching) return <p>Fetching...</p>;
  if (isVideosError || isChannelsError) return <p>Something is wrong!</p>;

  return (
    <main className="w-full flex max-sm:flex-col">
      <section className="sm:hidden aspect-video sticky top-0">
        <Video video={state.video} />
      </section>
      <section className="w-full flex flex-col mr-6 max-sm:m-0">
        <section className="w-full flex flex-col mb-8 max-sm:m-0">
          <div className="max-sm:hidden aspect-video">
            <Video video={state.video} />
          </div>
          <VideoInfo video={state.video} channel={state.channel} />
        </section>
        <section className="mb-4">
          <Comment video={state.video} />
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
