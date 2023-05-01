import React from 'react'
import Header from '../components/Header';
import Searchbox from '../components/Searchbox';
import Tabbar from '../components/Tabbar';
import { FaComment } from "react-icons/fa";
import '../styles/Chats.scss';
import { Link } from 'react-router-dom';


function Chats({friends}) {
  return (
    <>
    <Header left='Edit' title='Chats' right='' />

    <Searchbox />
    <div className='mainSection'>
      <header className='blind'><h2>Friends</h2></header>
      <ul>
        {friends.map((friends, index) =>
        <li key={index}>
          <Link to={'/chatting'} state={{friendId: friends.id, friendName:friendsName, friendEmail:friends.email,profileImg:friends.profileImg, profileBg: friends.profileBg}}>
            <span className='chatImg empty' style={{backgroundImage: `url(${friends.profileImg})`}}></span>
            <span className='chatCont'>
              <span className='chatsName'>{friends.name}</span>
              <span className='chatsLatest'>{friends.lastChat}</span>
            </span>
            <span className='chatsTime'><span>03</span>:<span>33</span></span>
          </Link>
        </li>
        )}
      </ul>
      </div>
      <div className='chatfaBtn'>
        <Link to={'/'}>
          <FaComment />
        </Link>
      </div>
    <Tabbar />
    </>
  )
}

export default Chats