import { useLocation } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import RelationVideoCard from '../components/RelationVideoCard';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import { useQuery } from '@tanstack/react-query';
import { extractChannelIdList } from '../utility/extract';

export default function VideoDetail() {
  const { state } = useLocation();

  const { youtube } = useYoutubeApi();
  const {
    isFetching: isVideosFetching,
    isLoading: isVideoLoading,
    isError: isVideoError,
    data: videos,
  } = useQuery({
    queryKey: ['relation videos'],
    queryFn: () => youtube.relationVideos(state.video.snippet.categoryId),
  });

  const {
    isFetching: isChannelsFetching,
    isLoading: isChannelsLoading,
    isError: isChannelsError,
    data: channels,
  } = useQuery({
    queryKey: ['relation video channels'],
    queryFn: () => youtube.channels(extractChannelIdList(videos)),
    enabled: !!videos,
  });

  if (isVideoLoading || isChannelsLoading) return <p>Loading...</p>;
  if (isVideosFetching || isChannelsFetching) return <p>Fetching...</p>;
  if (isVideoError || isChannelsError) return <p>Something is wrong!</p>;

  return (
    <main className="w-full flex max-sm:flex-col">
      <VideoCard video={state.video} channel={state.channel} />
      <div className="flex flex-col">
        {videos.map((video) => {
          return (
            <RelationVideoCard
              key={video.id}
              video={video}
              channels={channels}
            />
          );
        })}
      </div>
    </main>
  );
}
