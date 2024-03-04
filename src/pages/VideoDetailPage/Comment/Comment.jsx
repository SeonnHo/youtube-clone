import React from 'react';

export default function Comment({ video }) {
  const { commentCount } = video.statistics;
  return (
    <>
      <p className="text-xl font-bold my-6 max-sm:my-4 max-sm:px-2">
        댓글 {commentCount}개
      </p>
      <div className="flex max-sm:px-2">
        <img
          className="size-6 mr-2 rounded-full"
          src="https://cdn.pixabay.com/photo/2023/11/06/06/53/watermelon-8368960_1280.png"
          alt="thumbnail"
        />
        <div className="flex flex-col">
          <div className="flex">
            <p>@user-dajknb12</p>
            &nbsp;
            <p>1일 전</p>
          </div>
          <p>완전 재밌어보여요!!</p>
        </div>
      </div>
    </>
  );
}
