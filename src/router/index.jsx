import React from 'react';
import { Routes, Route, } from 'react-router';
// import { Link, } from 'react-router-dom';

import Home from '../pages/Home/index';
import User from './../pages/User/index';
import Clouds from './../pages/Clouds/index';
import AudioBlogs from './../pages/audioBlogs/index';
import Attention from './../pages/Attention/index';
import Search from './../pages/search/index.tsx';
import Login from './../pages/Login/index';
import Player from './../pages/player/index';

const router = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/Clouds" element={<Clouds />} />
        <Route path="/audioBlogs" element={<AudioBlogs />} />
        <Route path="/attention" element={<Attention />} />
        <Route path="/search" element={<Search />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/player" element={<Player />} />
      </Routes>
      {/* <nav>
        <Link to="/">Home</Link>
      </nav> */}
    </>

  );
}

export default router;
