import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  return (
    <article >
      <div>
        <p >{user.company.name}</p>
        <h3>{user.name}</h3>
      </div>

      <div >
        <p>
          <span>Email</span>
          {user.email}
        </p>
        <p>
          <span>Phone</span>
          {user.phone}
        </p>
      </div>

      <Link  to={`/users/${user.id}`}>
        View Details
      </Link>
    </article>
  );
};

export default UserCard;
