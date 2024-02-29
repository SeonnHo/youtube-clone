import React from 'react';

export default function Total({ video }) {
  const { commentCount } = video.statistics;
  return <p className="text-xl font-bold my-6">댓글 {commentCount}개</p>;
}
