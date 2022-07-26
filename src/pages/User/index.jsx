import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import FooterItem from './../../components/FooterItem/index';
import { Avatar, Drawer, Panel, PanelGroup, Toggle } from 'rsuite';
import { AiOutlineSearch, AiOutlineBars } from 'react-icons/ai';
import service from '../../service/index';
import { DemoContext } from '../../context/index.tsx'
import "./style.css";

export default function User() {
  const { changeTheme, theme, isChecked, changeIsChecked, changePlaylist } = useContext(DemoContext);

  const navigate = useNavigate();

  const toSearch = () => {
    navigate('/search');
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

  // 主题深浅色切换

  const handleTheme = () => {
    changeTheme();
    changeIsChecked();
  }

  // 根据theme改变状态
  useEffect(() => {
    if (theme === 'light') {
      document.body.style.backgroundColor = '#fff';

    }
    if (theme === 'dark') {
      document.body.style.backgroundColor = '#000';
      // document.getElementsByClassName('left_sidebar').style.backgroundColor = '#000';
      // document.getElementsByClassName(left_sidebar).style.Color = '#000';
    }
  }, [theme]);

  // 获取歌单列表
  const setPlaylistList = async (id) => {
    const res = await service.instance.get(`/playlist/track/all?id=${id}`)
    // console.log(res.data);
    changePlaylist(res.data);
    // 路由跳转
    navigate(`/playlist/${id}`);


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
                    onClick={setPlaylistList.bind(this, item.id)}
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
        <PanelGroup className={theme === 'light' ? 'left_sidebar' : 'left_sidebar_dark'}>
          <Panel className='font'>
            我的消息
          </Panel>
          <Panel className='font'>
            云贝中心
          </Panel>
        </PanelGroup>
        <PanelGroup className={theme === 'light' ? 'left_sidebar' : 'left_sidebar_dark'}>
          <p>
            音乐服务
          </p>
          <Panel className='font'>
            云村有票
          </Panel>
          <Panel className='font'>
            商城
          </Panel>
          <Panel className='font'>
            Beat交易平台
          </Panel>
          <Panel className='font'>
            游戏专区
          </Panel>
          <Panel className='font'>
            口袋彩铃
          </Panel>
        </PanelGroup>
        <PanelGroup className={theme === 'light' ? 'left_sidebar' : 'left_sidebar_dark'}>
          <p>
            其他
          </p>
          <Panel className='font'>
            设置
          </Panel>
          <Panel className='font'>
            深色模式     <Toggle size="sm" onClick={handleTheme} checked={isChecked} />
          </Panel>
          <Panel className='font'>
            定时关闭
          </Panel>
          <Panel className='font'>
            个性装扮
          </Panel>
          <Panel className='font'>
            边听边存
          </Panel>
          <Panel className='font'>
            在线听歌免流量
          </Panel>
          <Panel className='font'>
            音乐黑名单
          </Panel>
          <Panel className='font'>
            青少年模式
          </Panel>
          <Panel className='font'>
            音乐闹钟
          </Panel>
        </PanelGroup>
      </Drawer>
    </>
  )
}
