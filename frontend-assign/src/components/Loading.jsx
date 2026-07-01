import React from 'react'

const Loading = () => {
  return (
    <div className="status-box">
      <div className="spinner" aria-hidden="true" />
      <p>Loading users...</p>
    </div>
  )
}

export default Loading