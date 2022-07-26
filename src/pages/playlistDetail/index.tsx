// @ts-ignore
import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { DemoContext } from '../../context/index.tsx'
import { Panel } from 'rsuite'
import { AiOutlineArrowLeft, AiOutlineSearch } from 'react-icons/ai';
import "./style.css"
import service from '../../service/index';

export default function PlaylistDetail() {
  let navigate = useNavigate();
  const { playlist, changePlaylist } = useContext(DemoContext);
  let params = useParams();

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 18,
    margin: 15
  }

  useEffect(() => {
    service.instance.get(`/playlist/track/all?id=${params.id}`).then((res) => {
      changePlaylist(res?.data)
    })
  }, [params.id])// eslint-disable-line react-hooks/exhaustive-deps

  // to lest routers
  const toLast = () => {
    navigate("/user");
  }
  const toSearch = () => {
    navigate("/Search");
  }

  return (
    <>
      {/* header */}
      <div style={headerStyle}>
        <div>
          <AiOutlineArrowLeft onClick={toLast} />
          <p style={{ float: 'right' }}>歌单®</p>
        </div>
        <div>
          <AiOutlineSearch onClick={toSearch} className="load_icon" />
        </div>
      </div>
      <div>
        
      </div>
      <div>
        <ul>
          {
            playlist.songs?.map((item, index) => {
              return (
                <Panel key={index} bordered className='playlistDetail_item'>{index + 1}--{item.name}</Panel>
              )
            })
          }
        </ul>
      </div>
    </>
  )
}

