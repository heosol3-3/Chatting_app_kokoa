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
          <Route path='/' element={<Main friends={friends} userObj={userObj} />} />
          <Route path='/Chats' element={<Find />} />
          <Route path='/More' element={<More userObj={userObj} />} />
          <Route path='/Profile' element={<Profile friends={friends} userObj={userObj} />} />
          <Route path='/Chatting' element={<Chatting friends={friends} userObj={userObj} />} />
        </Routes>
      ) : (
        <Auth />
      )}
    </BrowserRouter>
    </>
  );
}

export default App;
