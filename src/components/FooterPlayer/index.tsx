import React, { useContext, useEffect, useState } from 'react'
import { DemoContext } from '../../context/index.tsx'
import "./style.css";
// icon
// import { AiOutlinePauseCircle, AiOutlinePlayCircle, AiOutlineUnorderedList } from 'react-icons/ai';
import service from '../../service';
export default function FooterPlayer(): JSX.Element {
  // redux...
  const { player_lists } = useContext(DemoContext);
  const [musicUrl, setMusicUrl] = useState()
  // 网络请求：player_lists
  async function getPlayerLists() {
    const res = await service.instance.get(`/song/url?id=${player_lists[0]}`);
    // console.log(res.data);
    return res.data.data[0].url;
  }
  useEffect(() => {
    getPlayerLists().then((res) => {
      setMusicUrl(res);
    })
  });

  return (
    <>
      <div id='foot_player'>
        <div>
          <audio src={musicUrl} autoPlay={true} controls></audio>          
        </div>
        {/* <div id="playerIcon"> */}
          {/* {
            play ? <AiOutlinePauseCircle onClick={changePlay} /> : <AiOutlinePlayCircle onClick={changePlay} />
          } */}
          {/* <AiOutlineUnorderedList />
        </div> */}
      </div>
    </>
  )
}
