import React from 'react';
import FooterItem from '../../components/FooterItem';
import "./style.css";
import Header from '../../components/header/index'
import HomeBanner from '../../components/homeBanner/index'

const Home = () => {
  return (
    <>
      <Header id="header"/>
      <HomeBanner />
      <FooterItem id="footer"></FooterItem>
    </>
  );
}

export default Home;
