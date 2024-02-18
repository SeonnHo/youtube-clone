import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useYoutubeApi } from '../context/YoutubeApiContext';

export default function Videos() {
  const { keyword } = useParams();
  const { youtube } = useYoutubeApi();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery({
    queryKey: ['search videos', keyword],
    queryFn: () => youtube.search(keyword),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something is wrong!</p>;

  return (
    <main className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xl:gap-4 lg:gap-3 md:gap-2 sm:gap-1 w-4/5">
      {videos.map((video) => {
        return (
          <div className="flex flex-col" key={video.id}>
            {video.id}
            <img
              className="rounded-xl"
              src={video.snippet.thumbnails.medium.url}
              alt="thumbnail"
              width={video.snippet.thumbnails.medium.width}
              height={video.snippet.thumbnails.medium.height}
            />
            <div className="text-sm font-bold">
              <p>{video.snippet.title}</p>
              <p className="text-gray-500">{video.snippet.channelTitle}</p>
            </div>
          </div>
        );
      })}
    </main>
  );
}
