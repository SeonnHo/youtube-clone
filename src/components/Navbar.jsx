import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaYoutube, FaSearch } from 'react-icons/fa';

export default function Navbar() {
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    setInput('');
  };

  return (
    <nav className="w-4/5 flex items-center py-2 mb-4">
      <div className="flex items-center">
        <FaYoutube className="text-red-600 size-8" />
        <Link to="/" className="font-sans font-bold text-xl">
          YouTube
        </Link>
      </div>
      <form
        className="flex items-center w-1/2 h-10 mx-auto"
        onSubmit={handleSubmit}
      >
        <input
          className="rounded-l-2xl border-gray-400 border pl-4 focus:outline-none focus:border-blue-700 w-full h-full"
          type="text"
          placeholder="검색..."
          value={input}
          onChange={(e) => handleChange(e)}
        />
        <button className="flex justify-center items-center w-16 h-full bg-gray-400 rounded-r-2xl text-white">
          <FaSearch />
        </button>
      </form>
    </nav>
  );
}
