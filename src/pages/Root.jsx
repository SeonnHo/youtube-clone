import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Root() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Navbar />
      <Outlet />
    </div>
  );
}
