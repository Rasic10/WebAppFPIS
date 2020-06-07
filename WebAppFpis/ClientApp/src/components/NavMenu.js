import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";

export class NavMenu extends Component {
  displayName = NavMenu.name;

  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>Farma Sarulja</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/counter">Counter</Nav.Link>
            <Nav.Link href="/fetchdata">Fetch Data</Nav.Link>
            <Nav.Link href="/obracuni">Obracuni</Nav.Link>
          </Nav>
          <Nav></Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
