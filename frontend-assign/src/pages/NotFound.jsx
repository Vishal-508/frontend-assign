import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
   <div className="page">
      <section className="panel centered">
        <p className="eyebrow">404</p>
        <h1>Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link className="button" to="/">
          Back to Dashboard
        </Link>
      </section>
    </div>
  )
}

export default NotFound