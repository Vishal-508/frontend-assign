import React from 'react'
import Loading from '../components/Loading';
import { Link, useParams } from 'react-router-dom';
import { useUsers } from '../hooks/useUsers';

const UserDetails = () => {

  const { id } = useParams();
  const { users, loading, error } = useUsers();
  const user = users.find((item) => String(item.id) === id);

  if (loading) {
    return (
      <div >
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div >
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (!user) {
    return (
      <div >
        <section >
          <h1>User not found</h1>
          <p>This profile does not exist or has not loaded yet.</p>
          <Link  to="/">
            Back to Dashboard
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div >
      <section >
        <Link  to="/">
          Back to Dashboard
        </Link>
        <p >{user.company.name}</p>
        <h1>{user.name}</h1>
        <p>{user.company.catchPhrase}</p>
      </section>

      <section >
        <article >
          <div >
            <p >Profile</p>
            <h2>Contact Details</h2>
          </div>
          <dl >
            <div>
              <dt>Username</dt>
              <dd>{user.username}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{user.email}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>{user.phone}</dd>
            </div>
            <div>
              <dt>Website</dt>
              <dd>{user.website}</dd>
            </div>
          </dl>
        </article>

        <article >
          <div >
            <p >Location</p>
            <h2>Address</h2>
          </div>
          <dl >
            <div>
              <dt>Street</dt>
              <dd>{user.address.street}</dd>
            </div>
            <div>
              <dt>Suite</dt>
              <dd>{user.address.suite}</dd>
            </div>
            <div>
              <dt>City</dt>
              <dd>{user.address.city}</dd>
            </div>
            <div>
              <dt>Zipcode</dt>
              <dd>{user.address.zipcode}</dd>
            </div>
          </dl>
        </article>

        <article >
          <div >
            <p >Geo</p>
            <h2>Coordinates</h2>
          </div>
          <dl >
            <div>
              <dt>Latitude</dt>
              <dd>{user.address.geo.lat}</dd>
            </div>
            <div>
              <dt>Longitude</dt>
              <dd>{user.address.geo.lng}</dd>
            </div>
          </dl>
        </article>

        <article >
          <div >
            <p >Company</p>
            <h2>{user.company.name}</h2>
          </div>
          <dl >
            <div>
              <dt>Catchphrase</dt>
              <dd>{user.company.catchPhrase}</dd>
            </div>
            <div>
              <dt>Business</dt>
              <dd>{user.company.bs}</dd>
            </div>
          </dl>
        </article>
      </section>
    </div>
  )
}

export default UserDetails