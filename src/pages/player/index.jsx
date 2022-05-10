import React from 'react'
import "./style.css"
// icon
import { AiOutlineShareAlt } from 'react-icons/ai'
import { BsChevronDown } from 'react-icons/bs'

export default function Player() {

  // to上一个页面
  const toPrev = () => {
    window.history.back();
  }

  return (
    <>
      {/* 播放页面 */}
      <div id='player_header'>
        <div onClick={toPrev} className="player_header_icon">
          <BsChevronDown />
        </div>
        <div>
          <div id='player_name'>
            {/* 歌曲名 */}
            天外来物
          </div>
          <div id='singer_name'>
            {/* 歌手 */}
            {

            }
            薛之谦
            <span>关注</span>
          </div>
        </div>
        <div className='player_header_icon'>
          <AiOutlineShareAlt />
        </div>
      </div>


      <div>
        
      </div>
    </>
  )
}
