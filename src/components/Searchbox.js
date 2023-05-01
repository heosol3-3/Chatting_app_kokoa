import React from 'react'
import { FaSearch } from "react-icons/fa";
import '../styles/Searchbox.scss';

function Searchbox() {
  return (
    <form className='searchBox'>
      <fieldset className='searchInner'>
        <legend className='blind'>검색창</legend>
        <FaSearch />
        <input type='search' name='search' placeholder='Find Friends, chars Plus Friends' />
      </fieldset>
    </form>
  )
}

export default Searchbox