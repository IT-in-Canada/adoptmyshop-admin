import React from "react";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  const {user} = props;
  return (
    <div>           
        <span>
            <Link to="/">Home</Link>&nbsp;
            <Link to="/profile">Profile</Link>
            <Link to="/logout">Log out</Link>
        </span>
        <h1>Hello, {user.name}</h1>
    </div>
  );
};

export default NavBar;