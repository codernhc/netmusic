import React, { createContext, useState } from "react";

type music = number;
// const PUBILC_TEXT: String = "Hello world"
const PLAYER_LISTS: number[] = []

export const DemoContext = createContext({})
export function Context(props) {
  const [player_lists, setPlayerLists] = useState(PLAYER_LISTS)
  const [play, setPlay] = useState(true);
  const [theme, setTheme] = useState('light');
  const [isChecked, setIsChecked] = useState(false);
  // 登入状态
  const [status, setStatus] = useState();
  // 保存歌单
  const [playlist, setPlaylist] = useState({});

  const setPlayer = (newMusic: music) => {
    if (player_lists.includes(newMusic)) {
      setPlayerLists(player_lists.filter((item: music) => item !== newMusic))
    } else {
      setPlayerLists([newMusic, ...player_lists])
    }
    console.log(newMusic, player_lists);
    // setPlayerLists({ ...newMusic, ...PLAYER_LISTS })
  }

  const changePlay = (): void => {
    setPlay(!play);
  }
  console.log(player_lists);

  // settheme
  const changeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }
  // setIsChecked
  const changeIsChecked = () => {
    setIsChecked(!isChecked);
  }

  // 登入状态
  const changeStatus = (newStatus) => {
    setStatus(newStatus);
  }
  const changePlaylist = (newPlaylist) => {
    setPlaylist(newPlaylist);
  }

  return (
    <DemoContext.Provider value={{
      // data
      player_lists,
      play,
      theme,
      isChecked,
      status,
      playlist,
      // methods
      changePlay,
      changeTheme,
      setPlayer,
      changeIsChecked,
      changeStatus,
      changePlaylist
    }}>
      {props.children}
    </ DemoContext.Provider>
  )
}