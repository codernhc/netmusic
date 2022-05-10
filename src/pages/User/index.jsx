import React, { useState, useEffect } from 'react'
import FooterItem from './../../components/FooterItem/index';
import { AiOutlineSearch, AiOutlineBars } from 'react-icons/ai';
import { Avatar, Drawer, } from 'rsuite';
import "./style.css";
import { Link } from 'react-router-dom';
import service from '../../service/index';

export default function User() {

  const toSearch = () => {
    window.location.href = "/search";
  }

  const [personalizedResult, setPersonalized] = useState([]);

  useEffect(() => {
    service.instance.get('/personalized?limit=4').then(res => {
      setPersonalized(res.data.result);
    }).catch(err => {
      console.log(err);
    });
  }, []);

  const [hotMusicList, setHotMusicList] = useState([]);
  const [newMusicList, setNewMusicList] = useState([]);

  useEffect(() => {
    service.instance.get('/toplist').then(res => {
      // console.log(res.data.list[3]);
      setHotMusicList(res.data.list[3]);
    }).catch(err => {
      console.log(err);
      setHotMusicList(null);
    });
  }, []);

  useEffect(() => {
    service.instance.get('/toplist').then(res => {
      // console.log(res.data.list[1]);
      setNewMusicList(res.data.list[1]);
    }).catch(err => {
      console.log(err);
      setNewMusicList(null);
    });
  }, []);

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = React.useState();
  const handleOpen = key => {
    setOpen(true);
    setPlacement(key);
  };

  // /playlist/detail?id=
  // const [playlist, setPlaylist] = useState([]);
  // useEffect(() => {
  //   service.instance.get(`/playlist/detail?id=${}`).then(res => {
  //     setPlaylist(res.data.playlist);
  //   }).catch(err => {
  //     console.log(err);
  //   }, []);

  // 对数字进行处理
  const handleNum = (num) => {
    if (num < 10000) {
      return num;
    }
    if (num < 100000000) {
      return (num / 10000).toFixed(1) + '万';
    }
    return (num / 100000000).toFixed(1) + '亿';
  }

  return (
    <>
      <div id='user_header'>
        <div>
          <AiOutlineBars onClick={() => handleOpen('left')} />
        </div>
        <div>
          <AiOutlineSearch onClick={toSearch} />
        </div>
      </div>
      <div id="user_card">
        <div id='avatar'>
          <Avatar
            size="lg"
            circle
            src=""
            alt="@SevenOutman"
          />
          <p style={{ marginTop: 10 }}>
            <Link to="/Login">立即登录&gt;</Link>
          </p>
        </div>
      </div>
      <div>
        <div id="text">为你推荐</div>
        <div id='recommend'>
          {/* {
            console.log(hotMusicList === null)
          } */}
          {
            hotMusicList === null ? null :
              <div className='recommend_card' id="hot_music_list">
                <div className='recommend_card'>
                  <img src={hotMusicList.coverImgUrl} alt="" />
                  <p className='play_count'>{
                    handleNum(hotMusicList.playCount)
                  }</p>
                  <p className='recommend_name'>{hotMusicList.name}</p>
                </div>
              </div>
          }
          {
            newMusicList === null ? null :
              <div className='recommend_card' id="new_music_list">
                <div className='recommend_card'>
                  <img src={newMusicList.coverImgUrl} alt="" />
                  <p className='play_count'>
                    {handleNum(newMusicList.playCount)}
                  </p>
                  <p className='recommend_name'>{newMusicList.name}</p>
                </div>
              </div>
          }
          {
            personalizedResult === null ? (
              <div>
                网络异常请刷新重试
              </div>
            ) :
              (personalizedResult.map((item, index) => {
                return (
                  <div key={index} className='recommend_card'
                    // onClick={ }
                  >
                    <img src={item.picUrl} alt="" />
                    <p className='play_count'>{
                      item.playCount > 10000 ?
                        (item.playCount / 10000).toFixed(1) + '万' :
                        item.playCount
                    }</p>
                    <p className='recommend_name'>{item.name}</p>
                  </div>
                )
              }))
          }
        </div>
      </div>
      <FooterItem></FooterItem>


      <Drawer open={open} size="full" placement={placement} onClose={() => setOpen(false)}>
        <Drawer.Body>
          {/* <Paragraph /> */}

        </Drawer.Body>
      </Drawer>
    </>
  )
}
