import React from 'react'
import { IoIosSearch } from 'react-icons/io'

const SearchBar = ({ setSearch }) => {
  return (
    <div style={{ maxWidth: '26rem', height: '38px', fontSize: '14px', letterSpacing: '1px' }} className='w-100 bg-white d-flex p-1 align-items-center'>
      <input name='search' type='input' onInput={e => setSearch(e.target.value)} placeholder='Search for products, brand and more' className='w-100 h-100 px-1' style={{ border: 0, outline: 0 }} />
      <diV className>
        <IoIosSearch size={25} className='text-primary' />
      </diV>
    </div>
  )
}

export default SearchBar