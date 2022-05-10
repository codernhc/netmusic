import React from 'react';
import { RiNeteaseCloudMusicLine } from 'react-icons/ri';
import { IoMusicalNotesOutline } from 'react-icons/io5';
import { FaBroadcastTower } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import "./style.css";

const FooterItem = () => {

  const actviceStyle = {
    color: "#2f00ff",
  }

  // 获取导航栏高亮状态
  const getActive = (path) => {
    const pathname = window.location.pathname;
    if (pathname === path) {
      return actviceStyle;
    }
    return {};
  }

  return (
    <>
      <div id='footer'>
        <div className='footeritem' style={ getActive("/") }>
          <RiNeteaseCloudMusicLine />
          <Link to="/">发现</Link>
        </div>
        <div className='footeritem' style={ getActive("/audioBlogs") }>
          <FaBroadcastTower />
          <Link to="/audioBlogs">播客</Link>
        </div>
        <div className='footeritem' style={ getActive("/user") }>
          <IoMusicalNotesOutline />
          <Link to="/user">我的</Link>
        </div>
        <div className='footeritem' style={ getActive("/attention") }>
          <FiUsers />
          <Link to="/attention">关注</Link>
        </div>
        <div className='footeritem' style={ getActive("/clouds") }>
          <RiNeteaseCloudMusicLine />
          <Link to="/clouds">云村</Link>
        </div>
      </div>
    </>
  );
}

export default FooterItem;

