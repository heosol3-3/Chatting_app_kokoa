import React from 'react';
import Header from '../components/Header';
import Tabbar from '../components/Tabbar';
import { FaAddressBook,FaQrcode,FaMobileAlt,FaRegEnvelope } from "react-icons/fa";
import '../styles/Find.scss';
import { Link } from 'react-router-dom';

function Find() {
  return (
    <>
    <Header left='Edit' title='Find' right='' />
    <main>
      <ul className='findMethod'>
        <li>
          <Link to={'/'}><FaAddressBook />Find</Link>
        </li>
        <li>
          <Link to={'/'}>
            <FaQrcode />QR code
          </Link>
        </li>
        <li>
          <Link to={'/'}>
            <FaMobileAlt />Shake
          </Link>
        </li>
        <li>
          <Link to={'/'}>
            <FaRegEnvelope />Invite via SNS
          </Link>
        </li>
      </ul>
      <section className='recommendSection'>
        <header><h2>Recommend Section</h2></header>
        <ul>
          <li>You have no recommended friends.</li>
        </ul>
      </section>
    </main>
    <Tabbar />
    </>
  )
}

export default Find