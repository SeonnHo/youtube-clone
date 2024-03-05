import React from 'react';
import { BiLike, BiDislike } from 'react-icons/bi';

export default function Comment({ video, src }) {
  return (
    <>
      <div className="flex max-lg:px-4 mb-5">
        <img
          className="size-10 max-lg:size-8 max-sm:size-6 mr-2 rounded-full"
          src={src}
          alt="thumbnail"
        />
        <div className="flex flex-col">
          <div className="flex items-center">
            <p className="text-xs">
              @user-user{Math.floor(Math.random() * 100) + 1}
            </p>
            &nbsp;
            <p className="text-zinc-500 text-xs">1일 전</p>
          </div>
          <p className="text-sm">이 댓글은 테스트 댓글입니다.</p>
          <div className="flex mt-2">
            <div className="flex items-center mr-2">
              <BiLike className="size-6 mr-1 cursor-pointer" />
              <p className="text-xs text-zinc-500">
                {Math.floor(Math.random() * 1000) + 1}
              </p>
            </div>
            <BiDislike className="size-6 mr-4 cursor-pointer" />
            <button className="w-11 text-xs hover:bg-zinc-700 rounded-xl">
              답글
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
