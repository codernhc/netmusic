import React, { CSSProperties, useContext } from 'react'
import { useState, useEffect } from 'react'
import {
  // useParams,
  useNavigate,
  // useLocation,
} from 'react-router-dom'
import { Input, InputGroup, List, Panel, Loader } from 'rsuite';
import { AiOutlineSearch, AiFillAudio, AiOutlinePlayCircle, AiOutlineEllipsis, AiOutlineArrowLeft } from 'react-icons/ai';
import service from '../../service/index'
import "./style.css";
import { DemoContext } from '../../context/index.tsx'

export default function Search(): JSX.Element {
  const { setPlayer } = useContext(DemoContext);
  let navigate = useNavigate();
  // let location = useLocation();
  // let params = useParams();

  const styles: CSSProperties = {
    width: 220,
    marginBottom: 10
  };

  const [searchValue, setValue] = useState("");
  const [searchResult, setResult] = useState([]);

  const divStyle: CSSProperties = {
    marginTop: 5,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: "center"
  }

  const [loading, setLoading] = useState('');

  //获取input的值
  const onChange = async (value: string) => {
    setValue(value);
    // console.log(searchValue);
    const res = await service.instance.get(`/search/suggest?keywords=${value}&type=mobile`)
    setLoading(res.data.result.allMatch);
  }

  const debounce = (func: () => void, wait: number) => {
    let timeout: NodeJS.Timeout;
    return function (...args: any[]) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    }
  }

  // 防抖后的函数
  const search = debounce(async () => {
    const res = await service.instance.get(`/search?keywords=${searchValue}`);
    setResult(res.data.result.songs);
  }, 500);


  // const onChange = (event) => {
  //   setValue(event);
  // }

  // search
  // const searchClk = () => {
  //   // service.search(searchValue); 
  //   setTimeout(() => {
  //     service.instance.get(`/search?keywords=${searchValue}`).then((res) => {
  //     // console.log(res.data.result);
  //     setResult(res.data.result.songs);
  //   });
  //   }, 1000);
  // }

  // async function searchClk() {
  //   const res = await service.instance.get(`/search?keywords=${searchValue}`);
  //   setResult(res.data.result.songs);
  //   if (searchValue === "") {
  //     setResult([]);
  //   }
  // }

  // to /Home
  const toLast = (): void => {
    navigate("/Home");
  }

  // 添加到播放列表
  const addToPlayList = (key: any): void => {
    // console.log(key);

    setPlayer(key);
  }

  const [hotMusic, setHotMusic] = useState([]);
  useEffect(() => {
    // /search/hot/detail
    service.instance.get(`/search/hot/detail`).then((res) => {
      setHotMusic(res.data.data);
    });
  }, []);

  const hotMusicClk = (key: any): void => {
    console.log(key);
    setValue(key);
    service.instance.get(`/search?keywords=${key}`).then((res) => {
      setResult(res.data.result.songs);
    });
  }

  return (
    <>
      <div style={divStyle}>
        <div>
          <AiOutlineArrowLeft onClick={toLast} />
        </div>
        <InputGroup inside style={styles}>
          <Input
            // defaultValue="薛之谦"
            value={searchValue}
            onChange={onChange}
            onKeyDown={(even) => { if (even.key === "Enter") { search(); } }}
          />
          <InputGroup.Button>
            <AiOutlineSearch onClick={search} />
          </InputGroup.Button>
        </InputGroup>
        <div>
          <AiFillAudio />
        </div>
      </div>
      {
        searchValue.length > 0 ? (
          <>
            {searchResult.length > 0 ?
              (<div>
                <Panel header="单曲" bordered style={{ margin: 20 }}>
                  {searchResult.map((item, index) => {
                    // console.log(item);
                    return (
                      <List>
                        <List.Item key={item.id} index={index} className="searchList" onClick={addToPlayList.bind(this, item.id)}>
                          {/* 信息 */}
                          <div>
                            <div className='musicName'>
                              {item.name}
                            </div>
                            <div className='musicArtist'>
                              {item.artists[0].name}-{item.name}
                              {/* {console.log(item)} */}
                            </div>
                          </div>
                          <div>
                            <AiOutlinePlayCircle />
                            <AiOutlineEllipsis className="AiOutlineEllipsisStyle" />
                          </div>
                        </List.Item>
                      </List>
                    )
                  })}
                </Panel>
              </div>)
              :
              (<div>
                {
                  loading.length > 0 ? (
                    <ul id='load'>
                      {
                        loading.map((item, index) => {
                          return (
                            <li key={index} onClick={hotMusicClk.bind(this, item.keyword)} className="load_li">
                              <AiOutlineSearch onClick={search} className="load_icon"/>
                              {item.keyword}
                            </li>
                          )
                        })
                      }
                    </ul>
                  ) : (
                    <>
                      <Loader center content="loading" />
                    </>
                  )
                }
              </div>)
            }
          </>
        ) : (
          <>
            <div id='font'>
              热搜榜
            </div>
            <List id="hotli">
              <ul id='hotli_ul'>
                {
                  hotMusic.map((item, index) => {
                    return (
                      <li onClick={hotMusicClk.bind(this, item.searchWord)}>
                        <span>{index + 1}</span>  {item.searchWord}
                      </li>
                    )
                  })
                }
              </ul>
            </List>
          </>
        )
      }
      {/* player */}
      {// text
      /* <ul>
        {
          searchResult.map((item, index) => (
            <li key={index}>
              {item.name}
            </li>
          ))
        }
      </ul> */}
      {/**
      热搜列表(详细) ok
      说明 : 调用此接口,可获取热门搜索列表
      接口地址 : /search/hot/detail
      调用例子 : /search/hot/detail

      搜索建议
      说明 : 调用此接口 , 传入搜索关键词可获得搜索建议 , 搜索结果同时包含单曲 , 歌手 , 歌单 ,mv 信息
      必选参数 : keywords : 关键词
      可选参数 : type : 如果传 'mobile' 则返回移动端数据
      接口地址 : /search/suggest
      调用例子 : /search/suggest?keywords=海阔天空 /search/suggest?keywords=海阔天空&type=mobile
      */}
    </>
  )
}
