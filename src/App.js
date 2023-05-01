import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { authService } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Find from './routes/Find';
import Profile from './routes/Profile';
import Chatting from './routes/Chatting';
import Auth from './components/Auth';

import friends from './data/friend.json';
import Main from './routes/Main';
import More from './routes/More';
import Chats from './routes/Chats';
import MyProfile from './routes/Myprofile';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState(null)

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if(user){
        setIsLoggedIn(user)
        setUserObj(user)
      }else { 
        setIsLoggedIn(false)
      }
    });
  },[]);

  return (
    <>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      {isLoggedIn ? (
        <Routes>
          <Route path='/' element={<Main friends={friends} userObj = {userObj} />} />
          <Route path='/chats' element={<Chats friends={friends}/>} />
          <Route path='/find' element={<Find />} />
          <Route path='/more' element={<More userObj = {userObj} />} />
          <Route path='/profile' element={<Profile friends={friends} userObj = {userObj} />} />
          <Route path='/myprofile' element={<MyProfile userObj={userObj} />} />
          <Route path='/chatting' element={<Chatting friends={friends} userObj = {userObj} />} />
        </Routes>
      ) : (
        <Auth />
      )}
    </BrowserRouter>
    </>
  );
}

export default App;
