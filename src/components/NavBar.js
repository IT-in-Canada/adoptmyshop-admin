import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Navbar       from "react-bootstrap/Navbar";
import Nav          from "react-bootstrap/Nav";
// import NavDropdown  from "react-bootstrap/NavDropdown";
import Button       from "react-bootstrap/Button";

const NavBar = (props) => {
  const {user} = props;
  console.log("user", user)

  const [logout, setLogout] = useState(false);

  const logoutFunc = () => {
    const question = window.confirm("Are you sure you wanna leave?");
    question && setLogout(true);
  }


  return (
    <div>
      { logout
          ? <Redirect to = "/logout"/>
          :
            <Navbar
              bg      = "info"
              expand  = "lg"
              sticky  = {"top"}
            >
              <Link to="/" className="navbar-brand">Adoptmyshop - Admin</Link>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav 
                  className="mr-auto"
                  fill variant="tab"
                >
                  <Link to="/profile" className="nav-link">{user.email}</Link>
                  <Link to="/validate" className="nav-link">Validate a Nominee</Link>
                  {/* <NavDropdown title="Company" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/validate">Validate a Nominee</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/checkPublished">Check Published Companies</NavDropdown.Item>
                    <NavDropdown.Item href="/checkHistory">Check History</NavDropdown.Item>
                  </NavDropdown> */}
                  <Link to="/publish" className="nav-link">Publish a new company</Link>
                  <Link to="/about" className="nav-link">About</Link>
                </Nav>
                <Button onClick = { logoutFunc }>Logout</Button>
              </Navbar.Collapse>
            </Navbar>
      }
    </div>
  );
};

export default NavBar;
