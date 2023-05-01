import { FaPlane,FaWifi,FaMoon,FaBluetoothB,FaBatteryFull } from "react-icons/fa";
import '../styles/Header.scss';
import { Link } from 'react-router-dom';


function Header({left, title, right, span, isTransparent}) {
  if(left === undefined){left = ''}
  if(title === undefined){title = ''}
  if(right === undefined){right = ''}
  if(span === undefined){span = ''}

  const headerClassName = isTransparent ? 'header transparent' : 'header';
  const time = new Date();
  const nowHour = time.getHours();
  const tenMinute = time.getMinutes();
  const nowMinutes = tenMinute < 10 ? '0'+ tenMinute : tenMinute;

  return (
    <div className='Header'>
      <div className={`headerContainer ${headerClassName}`}>
      <div className='statusBar'>
        <div className='leftItem'>
          <FaPlane />
          <FaWifi />
        </div>

        <div className='centerItem'>
          <span>{nowHour}</span>:<span>{nowMinutes}</span>
        </div>

        <div className='rightItem'>
          <FaMoon />
          <FaBluetoothB />
          <span><span>100</span>%</span>
          <FaBatteryFull />
        </div>

      </div>

      <div className='titleBar'>
        <h1>{title}<span>{span}</span></h1>
        <div className='leftItem'>
          <Link to={'/'}>{left}</Link>
        </div>
        <div className='rightItem'>
          <Link to={'/'}>{right}</Link>
          </div>
      </div>
      </div>
    </div>
  )
}

export default Header;