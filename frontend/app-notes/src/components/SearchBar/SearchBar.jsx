import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'

const SearchBar = ({ value, onChange, handleSearch, onClearSearch}) => {
  return (
    <>
        <div className='w-80 flex items-center px-4 rounded-md bg-slate-100 border'>
            <input type="text" placeholder='Buscar notas' className='w-full text-xs bg-transparent py-[11px] outline-none' value={value} onChange={onChange}/>
        <FaMagnifyingGlass className='' onClick={handleSearch} />
        </div>
    </>
  )
}

export default SearchBar