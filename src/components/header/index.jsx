import React, { useState } from 'react';
import { Drawer } from 'rsuite';
import {
  // useParams,
  useNavigate,
  // useLocation,
} from 'react-router-dom'
import { AiOutlineSearch, AiOutlineBars, AiFillAudio } from 'react-icons/ai';
import "./style.css";

export default function Header() {
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
        <Drawer.Body>
          {/* <Paragraph /> */}
        </Drawer.Body>
      </Drawer>
    </>
  )
}
