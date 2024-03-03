import React from 'react';

export default function Title({ video }) {
  const { title } = video.snippet;
  return <h2 className="text-xl font-bold mt-4 max-sm:px-2">{title}</h2>;
}
