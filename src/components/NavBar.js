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
              // className="showNormalMenu"
              expand  = "lg"
              sticky  = {"top"}
            >
              <Navbar.Brand href="#home">Adoptmyshop - Admin</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/user">{user.email}</Nav.Link>
                  <Nav.Link href="/validate">Validate a Nominee</Nav.Link>
                  {/* <NavDropdown title="Company" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/validate">Validate a Nominee</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/checkPublished">Check Published Companies</NavDropdown.Item>
                    <NavDropdown.Item href="/checkHistory">Check History</NavDropdown.Item>
                  </NavDropdown> */}
                  <Nav.Link href="/publish">Publish a new company</Nav.Link>
                  <Nav.Link href="/about">About</Nav.Link>
                </Nav>
                <Button onClick = { logoutFunc }>Logout</Button>
              </Navbar.Collapse>
            </Navbar>
      }
    </div>
  );
};

export default NavBar;

    {/**
      <div>           
      <span>
      <Link to="/">Home</Link>&nbsp;
      <Link to="/profile">Profile</Link>
      <Link to="/logout">Log out</Link>
      </span>
      <h1>Hello, {user.name}</h1>
      </div>
    */}