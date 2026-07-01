import React from 'react'

const SearchBar = ({value, onChange}) => {
  return (
    <label className="search-box" >
      <span>Search by name</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Enter Name"
      />
    </label>
  )
}

export default SearchBar