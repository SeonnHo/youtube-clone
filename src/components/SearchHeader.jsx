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
    <header className="w-4/5 flex items-center py-2 mb-4">
      <nav>
        <Link to="/" className="flex items-center font-sans font-bold text-xl">
          <BsYoutube className="text-brand size-8" />
          <h1 className="font-bold ml-2 text-3xl">YouTube</h1>
        </Link>
      </nav>
      <form
        className="w-full flex justify-center items-center"
        onSubmit={handleSubmit}
      >
        <input
          className="w-7/12 p-2 outline-none bg-black text-gray-50"
          type="text"
          placeholder="Search..."
          value={input}
          onChange={(e) => handleChange(e)}
        />
        <button className="bg-zinc-400 px-4">
          <BsSearch />
        </button>
      </form>
    </header>
  );
}
