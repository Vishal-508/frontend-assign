import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  return (
    <article className="user-card">
      <div>
        <p className="eyebrow" >{user.company.name}</p>
        <h3>{user.name}</h3>
      </div>

      <div className="user-meta" >
        <p>
          <span>Email</span>
          {user.email}
        </p>
        <p>
          <span>Phone</span>
          {user.phone}
        </p>
      </div>

      <Link className="button button-secondary" to={`/users/${user.id}`}>
        View Details
      </Link>
    </article>
  );
};

export default UserCard;
