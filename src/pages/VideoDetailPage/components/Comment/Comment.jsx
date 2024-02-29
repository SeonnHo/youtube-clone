import React from 'react';
import Total from './Total';

export default function Comment({ video }) {
  return (
    <section>
      <Total video={video} />
    </section>
  );
}
