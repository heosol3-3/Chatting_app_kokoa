import React, { useState } from 'react';
import { FaUser,FaComment,FaSearch,FaEllipsisH } from "react-icons/fa";
import '../styles/Tabbar.scss';
import { Link, useLocation } from 'react-router-dom';
import Main from '../routes/Main';

function Tabbar() {
  const [activeTab, setActiveTab] = useState('home');
  const location = useLocation();

  const tabClick = (tabName) => {
    setActiveTab(tabName);
  }
  const setActiveClass = (tabName) => {
    return location.pathname === `/${tabName}` ? 'on' : '';
  }

  return (
    <nav className='tabBar'>
      <ul>
        <Main />
        <li><Link to='/' className={setActiveClass('')} onClick={() => tabClick('Main')}><FaUser className='icon' />Frends</Link></li>
        <li><Link to='/chats' className={setActiveClass('Chats')} onClick={() => tabClick('Chats')}><FaComment className='icon' />Chats</Link></li>
        <li><Link to='/find' className={setActiveClass('Find')} onClick={() => tabClick('Find')}><FaSearch className='icon' />Find</Link></li>
        <li><Link to='/more' className={setActiveClass('More')} onClick={() => tabClick('More')}><FaEllipsisH className='icon' />More</Link></li>
      </ul>
    </nav>
  )
}

export default Tabbar