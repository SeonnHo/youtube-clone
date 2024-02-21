import { useLocation } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import RelationVideoCard from '../components/RelationVideoCard';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import { useQuery } from '@tanstack/react-query';

export default function VideoDetail() {
  const { state } = useLocation();

  const { youtube } = useYoutubeApi();
  const {
    isLoading: isVideoLoading,
    isError: isVideoError,
    data: videos,
  } = useQuery({
    queryKey: ['relation videos'],
    queryFn: () => youtube.relationVideos(state.video.snippet.categoryId),
  });

  const {
    isLoading: isChannelLoading,
    isError: isChannelError,
    data: channels,
  } = useQuery({
    queryKey: ['relation video channels'],
    queryFn: () => youtube.channels(extractChannelIds(videos)),
    enabled: !!videos,
  });

  const extractChannelIds = (videos) => {
    let videoIdList = [];
    videos.map((video) => videoIdList.push(video.snippet.channelId));
    return videoIdList;
  };

  if (isVideoLoading || isChannelLoading) return <div>Loading...</div>;
  if (isVideoError || isChannelError) return <div>Something is wrong!</div>;

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
