import React, { createContext, useState } from "react";

type music = number;
// const PUBILC_TEXT: String = "Hello world"
const PLAYER_LISTS: any[] = []

export const DemoContext = createContext({})
export function Context({ children }) {
  const [player_lists, setPlayerLists] = useState(PLAYER_LISTS)
  const [play, setPlay] = useState(true);

  const setPlayer = (newMusic: music) => {
    if (player_lists.includes(newMusic)) {
      setPlayerLists(player_lists.filter((item: music) => item !== newMusic))
    } else {
      setPlayerLists([newMusic, ...player_lists])
    }
    console.log(newMusic, player_lists);
    // setPlayerLists({ ...newMusic, ...PLAYER_LISTS })
  }

  const changePlay = () => {
    setPlay(!play);
  }
  console.log(player_lists);

  return (
    <DemoContext.Provider value={{
      // data
      player_lists,
      play,
      // methods
      changePlay,
      setPlayer
    }}>
      {children}
    </ DemoContext.Provider>
  )
}