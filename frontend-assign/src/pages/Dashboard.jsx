import React from 'react'
import UserForm from '../components/UserForm'
import SearchBar from '../components/SearchBar'
import UserCard from '../components/UserCard'
import { useUsers } from '../hooks/useUsers'
import Loading from '../components/Loading'

const Dashboard = () => {
   const { filteredUsers, loading, error, searchTerm, setSearchTerm } = useUsers();
  return (
   <div >
      <section >
        <div>
          <p >React Frontend Assignment</p>
          <h1>User Dashboard</h1>
          <p>
            Search users, add client-side records, and open detailed profiles
            with address and geo-location data.
          </p>
        </div>
      </section>

      <UserForm />

      <section >
        <div >
          <div >
            <p >Directory</p>
            <h2>Users</h2>
          </div>

          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>

        {loading && <Loading />}
        {error && <ErrorMessage message={error} />}

        {!loading && !error && filteredUsers.length === 0 && (
          <div >
            <p>No users found for your search.</p>
          </div>
        )}

        {!loading && !error && filteredUsers.length > 0 && (
          <div >
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </section>
      </div>
  )
}

export default Dashboard