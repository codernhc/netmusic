import React from 'react';
import { RiNeteaseCloudMusicLine } from 'react-icons/ri';
import { IoMusicalNotesOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import "./style.css";

const FooterItem = () => {

  const actviceStyle = {
    color: "red",
  }

  // 获取导航栏高亮状态
  const getActive = (path) => {
    const pathname = window.location.pathname;
    if (pathname === path) {
      return actviceStyle;
    }
  }

  return (
    <>
      <div id='footer'>
        <div className='footeritem' style={ getActive("/") }>
          <RiNeteaseCloudMusicLine />
          <Link to="/">发现</Link>
        </div>
        <div className='footeritem' style={ getActive("/user") }>
          <IoMusicalNotesOutline />
          <Link to="/user">我的</Link>
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

