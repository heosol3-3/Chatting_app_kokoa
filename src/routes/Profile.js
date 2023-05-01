import React from 'react'
import { Link } from 'react-router-dom'
import { FaComment,FaPencilAlt } from "react-icons/fa";
import '../styles/Profile.scss';

function Profile() {
  return (
    <main className='main'>
      <section className='background'>
        <h2 className='blind'>My Profile background image</h2>
      </section>
      <section className='profile'>
        <h2 className='blind'>My profile info</h2>
        <div className='profileImg empty'></div>
        <div className='profileCont'>
          <span className='profileName'>My Name</span>
          <input type='mail' className='profileEmail' placeholder='Userid@gmail.com' />
          <ul className='profileMenu'>
          <li>
            <Link to={'/'}>
              <span className='icon'>
                <FaComment />
              </span>
              My Chatroom
            </Link>
          </li>
          <li>
            <Link to={'/'}>
              <span className='icon'>
                <FaPencilAlt />
              </span>
              Edit Profile
            </Link>
          </li>
          </ul>
        </div>
      </section>
    </main>
  )
}

export default Profile