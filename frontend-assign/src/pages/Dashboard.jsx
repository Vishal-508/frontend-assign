import { useEffect, useMemo, useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import UserForm from "../components/UserForm";
import { useUsers } from "../hooks/useUsers";

const USERS_PER_PAGE = 6;

function Dashboard() {
  const { filteredUsers, loading, error, searchTerm, setSearchTerm } = useUsers();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / USERS_PER_PAGE));
  const activePage = Math.min(currentPage, totalPages);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filteredUsers.length]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (activePage - 1) * USERS_PER_PAGE;
    const endIndex = startIndex + USERS_PER_PAGE;

    return filteredUsers.slice(startIndex, endIndex);
  }, [activePage, filteredUsers]);

  function handlePageChange(page) {
    const nextPage = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(nextPage);
  }

  return (
    <div className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">React Frontend Assignment</p>
          <h1>User Dashboard</h1>
          <p>
            Search users, add client-side records, and open detailed profiles
            with address and geo-location data.
          </p>

          <div className="hero-actions">
            <button
              className="button"
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
            >
              Create New User
            </button>
          </div>
        </div>
      </section>

      {isCreateModalOpen && (
        <Modal
          eyebrow="Client side form"
          title="Create New User"
          onClose={() => setIsCreateModalOpen(false)}
        >
          <UserForm
            onCancel={() => setIsCreateModalOpen(false)}
            onCreated={() => setIsCreateModalOpen(false)}
          />
        </Modal>
      )}

      <section className="panel">
        <div className="list-header">
          <div className="section-heading">
            <p className="eyebrow">Directory</p>
            <h2>Users</h2>
          </div>

          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>

        {loading && <Loading />}
        {error && <ErrorMessage message={error} />}

        {!loading && !error && filteredUsers.length === 0 && (
          <div className="status-box">
            <p>No users found for your search.</p>
          </div>
        )}

        {!loading && !error && filteredUsers.length > 0 && (
          <>
            <div className="user-grid">
              {paginatedUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>

            <Pagination
              currentPage={activePage}
              totalPages={totalPages}
              totalItems={filteredUsers.length}
              pageSize={USERS_PER_PAGE}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </section>
    </div>
  );
}

export default Dashboard;