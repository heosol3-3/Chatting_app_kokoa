import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Tabbar from '../components/Tabbar';
import { FaRegCommentDots,FaRegKissWinkHeart,FaPaintBrush,FaRegHandPeace,FaUserCircle,FaInfoCircle,FaUtensils,FaHome,FaTv,FaPencilAlt,FaGraduationCap,FaLandmark,FaWonSign,FaVideo } from "react-icons/fa";
import '../styles/More.scss';


function More() {
  return (
    <>
    <Header />
    <main>
      <section className='userInfo'>
        <h2 className='blind'>사용자 정보</h2>
        <span className='profileImg empty'></span>
        <span className='profileInfo'>
          <span className='profileName'>My Name</span>
          <span className='profileEmail'>Userid@gmail.com</span>
        </span>
        <span className='chatImg'><Link to={'/'}><FaRegCommentDots /></Link></span>
      </section>
      <section className='userMenu'>
        <h2 className='blind'>사용자 메뉴</h2>
        <ul>
        <li><Link to={'/'}><FaRegKissWinkHeart />Emoticons</Link></li>
        <li><Link to={'/'}><FaPaintBrush />Themes</Link></li>
        <li><Link to={'/'}><FaRegHandPeace />Plus Friends</Link></li>
        <li><Link to={'/'}><FaUserCircle />Account</Link></li>
        </ul>
      </section>
      <section className='plusFriends'>
        <header>
          <h2>Plus Friends</h2>
          <span><FaInfoCircle />Learn More</span>
        </header>
        <ul className='plusList'>
        <li><Link to={'/'}><FaUtensils />Order</Link></li>
        <li><Link to={'/'}><FaHome />Store</Link></li>
        <li><Link to={'/'}><FaTv />Channel/Radio</Link></li>
        <li><Link to={'/'}><FaPencilAlt />Creation</Link></li>
        <li><Link to={'/'}><FaGraduationCap />Education</Link></li>
        <li><Link to={'/'}><FaLandmark />Politics/Society</Link></li>
        <li><Link to={'/'}><FaWonSign />Finance</Link></li>
        <li><Link to={'/'}><FaVideo />Movies/Music</Link></li>
        </ul>
      </section>
      <section className='moreApp'>
        <h2 className='blind'>앱 더보기</h2>
        <ul>
        <li><Link to={'/'}><span className='appIcon'>Kakao Story</span></Link></li>
        <li><Link to={'/'}><span className='appIcon'>Path</span></Link></li>
        <li><Link to={'/'}><span className='appIcon'>Kakao Friends</span></Link></li>
        </ul>
      </section>
    </main>
    <Tabbar />
    </>
  )
}

export default More