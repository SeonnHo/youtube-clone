import { useLocation } from 'react-router-dom';
import VideoCard from './components/VideoCard/VideoCard';
import RecommendationVideoCard from './components/RecommendationVideoCard/RecommendationVideoCard';
import { useYoutubeApi } from '../../context/YoutubeApiContext';
import { useQuery } from '@tanstack/react-query';
import { extractChannelIdList } from '../../utility/extract';
import Comment from './components/Comment/Comment';

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
      <div className="w-full flex flex-col mr-6">
        <VideoCard video={state.video} channel={state.channel} />
        <Comment video={state.video} />
      </div>
      <section className="flex flex-col">
        {videos.map((video) => {
          return (
            <RecommendationVideoCard
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
