import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
   <div >
      <section >
        <p >404</p>
        <h1>Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link  to="/">
          Back to Dashboard
        </Link>
      </section>
    </div>
  )
}

export default NotFound