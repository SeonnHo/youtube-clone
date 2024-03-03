import React from 'react';

export default function TotalComment({ video }) {
  const { commentCount } = video.statistics;
  return (
    <p className="text-xl font-bold my-6 max-sm:my-4 max-sm:px-2">
      댓글 {commentCount}개
    </p>
  );
}
