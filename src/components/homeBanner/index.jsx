import React, { useEffect, useState } from 'react';
import { Carousel } from 'rsuite';
import service from '../../service/index'
import "./style.css"

export default function HomeBanner() {
  const [imgResult, setResult] = useState([]);

  useEffect(() => {
    service.instance.get('/banner').then(res => {
      setResult(res.data.banners);
    }).catch(err => {
      console.log(err);
    });
  }, []);

  return (
    <>
      <Carousel autoplay id="Shuffling">
        {
          imgResult.map((item, index) => {
            return (
              <img src={item.imageUrl} alt="" key={index} height="150" />
            )
          })
        }
      </Carousel>
    </>
  )
}
