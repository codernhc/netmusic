import React, { useState, useContext,useEffect } from 'react';
import { Drawer, Panel, PanelGroup, Toggle } from 'rsuite';
import {
  // useParams,
  useNavigate,
  // useLocation,
} from 'react-router-dom'
import { AiOutlineSearch, AiOutlineBars, AiFillAudio } from 'react-icons/ai';
import { DemoContext } from '../../context/index.tsx'
import "./style.css";

export default function Header() {
  const { changeTheme, theme, isChecked, changeIsChecked } = useContext(DemoContext);

  const navigate = useNavigate();

  const divStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: 20,
  }

  // to /search
  const toSearch = () => {
    navigate('/search');
  }

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = React.useState();

  const handleOpen = key => {
    setOpen(true);
    setPlacement(key);
  };

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
  return (
    <>
      <div style={divStyle}>
        <div>
          <AiOutlineBars onClick={() => handleOpen('left')} />
        </div>
        <div id="searchStyle">
          <input type="text" id='header_input' onClick={toSearch} />
          <AiOutlineSearch id='search_icon' />
        </div>
        <div>
          <AiFillAudio />
        </div>
      </div>

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
