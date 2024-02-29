import React from 'react';
import Description from './Description';
import Video from './Video';
import Owner from './Owner';
import Title from './Title';

export default function VideoCard({ video, channel }) {
  return (
    <section className="w-full flex flex-col mb-8">
      <Video video={video} />
      <Title video={video} />
      <Owner video={video} channel={channel} />
      <Description video={video} />
    </section>
  );
}
