import { BsYoutube, BsSearch } from 'react-icons/bs';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function SearchHeader() {
  const [input, setInput] = useState('');
  const { keyword } = useParams();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    setInput();
    navigate(`/videos/${input}`);
  };

  useEffect(() => setInput(keyword || ''), [keyword]);
  return (
    <header className="w-full flex items-center py-2 mb-4 max-sm:w-full max-sm:mb-2">
      <Link
        to="/"
        className="flex items-center font-sans font-bold max-sm:ml-2"
      >
        <BsYoutube className="text-brand size-8 max-sm:size-6" />
        <h1 className="font-bold ml-2 text-3xl max-sm:ml-1 max-sm:text-xl">
          YouTube
        </h1>
      </Link>
      <form className="w-full flex justify-center" onSubmit={handleSubmit}>
        <input
          className="w-7/12 p-2 pl-4 outline-none bg-black text-gray-50 rounded-l-full border border-zinc-700 max-sm:p-1 max-sm:pl-3"
          type="text"
          placeholder="Search..."
          value={input}
          onChange={(e) => handleChange(e)}
        />
        <button className="bg-zinc-800 px-6 rounded-r-full border border-l-0 border-y-zinc-700 border-r-zinc-700 max-sm:px-4">
          <BsSearch />
        </button>
      </form>
    </header>
  );
}
