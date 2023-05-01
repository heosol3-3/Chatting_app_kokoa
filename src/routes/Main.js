import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import Searchbox from '../components/Searchbox';
import Tabbar from '../components/Tabbar';
import '../styles/Main.scss';
import { Link } from 'react-router-dom';
import { FaCog } from "react-icons/fa";
import { db } from '../fbase';
import { doc, onSnapshot } from 'firebase/firestore';

function Main({friends, userObj}) {
  const [newProfileMassage, setNewProfileMassage] = useState('')
  useEffect(() => {
    const mgRef = doc(db, `${userObj.uid}/ProfileMessage`);
    const mgUnsub = onSnapshot(mgRef, (doc) => {
      if(doc.exists()) { 
        const data = doc.data();
        setNewProfileMassage(data.message);
      }
    });
    return () => {
      mgUnsub();
    }
  },[userObj.uid]);

  const truncate = (str, n) =>{
    return str?.length > n? str.substr(0,n-1) + "..." : str;
  }

  return (
    <>
    <Header left="Manage" title="Friends" span={friends.length} right={<FaCog />} />
    <Searchbox />
    <div className='Main'>
      <section className='mainSection'>
        <header><h2>My Profile</h2></header>
        <ul>
          <li className='friendList'>
            <Link className='myProfile friendProfile' to='/myprofile'>
              <span className='profileImg empty' style={userObj.photoURL === null ? {backgroundImage: ''} : {backgroundImage: `url(${userObj.photoURL})`}}></span>
              <span className='profileName'>{`${userObj.displayName || "Enter My name"}`}</span>
            </Link>
          </li>
        </ul>
      </section>
      <section className='mainSection'>
        <header><h2>Friends</h2></header>
        <ul>
          {friends.map((friends, index) =>
            <li key={index} className='friendList'>
              <Link className='friendProfile' to={'/profile'} state={{friendId:friends.id, friendsName: friends.name, friendEmail:friends.email, profileImg: friends.profileImg, profileBg: friends.profileBg}}>
                <div className='profileRow empty' style={{backgroundImage: `url(${friends.profileImg})`}}>
                  <div className='profileName'><span>{friends.name}</span></div>
                  <div className='profile_messages'>{truncate(friends.catchPhrase, 20)}</div>
                </div>
              </Link>
            </li>
          )}

        </ul>
      </section>
    </div>

    <Tabbar />

    </>
  )
}

export default Main