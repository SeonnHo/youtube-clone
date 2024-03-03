import React from 'react';
import TotalComment from './TotalComment';
import CommentCard from './CommentCard';

export default function Comment({ video }) {
  return (
    <section className="mb-4">
      <TotalComment video={video} />
      <CommentCard />
    </section>
  );
}
