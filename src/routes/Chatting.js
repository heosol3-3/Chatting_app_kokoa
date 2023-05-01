import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaPlus,FaRegSmile,FaPlay,FaChevronLeft,FaMicrophone,FaTimes } from "react-icons/fa";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import Header from '../components/Header';
import '../styles/Chatting.scss';
import { v4 as uuidv4 } from 'uuid';
import { db, storage } from '../firebase';


function Chatting({userObj}) {

  const { friendName, friendEmail, profileImg, profileBg, friendId } = useLocation().state;

  const [chat, setChat] = useState('');
  const [chats, setChats] = useState([]);

  const [attachment, setAttachment] = useState('');

  useEffect(() => {
    const q = query(collection(db, `${friendId} ${userObj.uid}`),orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs
      .map((doc) => ({...doc.data(), id:doc.id}))
      .filter((data) => data.text || data.attachment);
      setChats(newArray);
    });
    window.scroll({
      top:document.body.scrollHeight,
      behavior:'smooth'
    });
  }, [userObj.uid]);

  const onChange = e =>{
    e.preventDefault();
    const {target: {value}} = e;
    setChat(value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    if(!chat && !attachment) return;

    try{
      let attachmentUrl = '';
      if(attachment !== ''){
        const storgeRef = ref(storge, `${friendId} ${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(storgeRef, attachment, 'data_url')
        attachmentUrl = await getDownloadURL(ref(storage, response.ref))
      }
      const docRef = await addDoc(collection(db,`${friendId} ${userObj.uid}`),
      {
        text:chat,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        attachmentUrl
      });

      window.scroll({
        top: document.body.scrollHeight,
        behavior:'smooth'
      })
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setChat('');
    setAttachment('');
  }

  const onFileChange = e => {
    const {target:{files}} = e;
    const theFile=files[0];

    setAttachment('');

    const reader = new FileReader();
    reader.onloadend = (finishedEvent) =>{
      const {currentTarget:{result}} = finishedEvent;
      setAttachment(result)
    }
    reader.readAsDataURL(theFile);
    e.target.value = '';
  }

  const onclearAttachment = e => {
    e.preventDefault();
    setAttachment('');
  }

  return (
    <>
    <div className='chattingBody'>
      <Header left={<FaChevronLeft />} title={friendName} isTransparent={true} />
      <main className='chattingMain'>
        <span className='dateInfo'>Thursday,April 21, 2023</span>
        <div className='chatBox my'>
          <span className='chat'>Hello!</span>
          <span className='chat'>Hello! This is a test message.Hello! This is a test message.Hello! This is a test message.</span>
          <span className='chat'>This is a test message.</span>
          <span className='chatTime'><span>03</span>:<span>33</span></span>
        </div>
        <div className='chatBox other'>
          <div className='otherInfo'>

            <Link to={'/Profile'} state={{name : friendName, email:friendEmail, profileImg: profileImg, profileBg: profileBg}}><span className='profileImg empty' style={{backgroundImage:`url(${profileImg})`}}></span></Link>
            <span className='profileName'>{friendName}</span>
          </div>
          <span className='chat'>And this is an answer</span>
          <span className='chat'>And this is an answer And this is an answer</span>
          <span className='chat'>And this is an answer</span>
          <span className='chatTime'><span>03</span>:<span>33</span></span>
        </div>
        <div className='chatBox my'>
          {chats.map((chat) => (
            <div key={chat.id} className='chat'>
              <Comment
              chatObj={chat}
              isOwner={chat.creatorId === userObj.uid}
              createdAt={chat.createdAt}
              userObj={userObj}
              friendId={friendId}
              />
              </div>
          ))}
        </div>
      </main>
      <footer className='footer'>
        <form onSubmit={onSubmit}>
          <fieldset className='textBox'>
            <legend className='blind'>채팅입력창</legend>
            <label htmlFor='upload-file' className='plusBtn'><FaPlus /></label>
            <label htmlFor='upload-file'>
              <input className='blind' type='file' accept='image/*' name='plusBtn' id='upload-file' onChange={onFileChange} />
            </label>
            <label htmlFor='upload-file' className='blind'>채팅입력</label>
            <input type='text' id='chatting' className='textField' value={chat} onChange={onChange} />
            <label htmlFor='chat_submit' className='chatSubmit'><FaPlay />
            <input type='submit' id='chatSubmit' className='blind' /></label>
            <span className='emotionBtn'><Link to={'/'}><FaRegSmile /></Link></span>
            <span className='voiceBtn'><Link><FaMicrophone /></Link></span>
            {attachment &&(
              <div className='attachment'>
                <img className='attachment_img' src={attachment} width='100' height='100' alt='' />
                <label htmlFor='button_delete'><FaTimes />
                <button className='blind' id='button_delete' onClick={onclearAttachment}>Remove</button>
                </label>
              </div>
            )}
          </fieldset>
        </form>
      </footer>
    </div>
    </>
  )
}

export default Chatting