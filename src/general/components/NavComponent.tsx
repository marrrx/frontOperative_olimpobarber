import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { StyledNavLink } from "./StyledNavLink";

export const NavComponent = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar bg="black" data-bs-theme="dark" expand="lg" expanded={expanded}>
      <Container>
        <Link to={"/"}>
          <Navbar.Brand>
            <img
              src="/logo_light.png"
              width="100"
              height="100"
              className="d-none d-md-block align-top"
              alt="logo"
            />
            <img
              src="/logo_light.png"
              width="60"
              height="60"
              className="d-md-none align-top"
              alt="logo"
            />
          </Navbar.Brand>
        </Link>

        <Navbar.Toggle
          aria-controls="navbar-nav"
          onClick={() => setExpanded(expanded ? false : true)}
        />

        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav>
            <StyledNavLink
              className="rounded me-5"
              to="/"
              onClick={() => setExpanded(false)}
            >
              Inicio
            </StyledNavLink>
            <StyledNavLink
              className="rounded me-5"
              to="/citas"
              onClick={() => setExpanded(false)}
            >
              Citas
            </StyledNavLink>
            <StyledNavLink
              className="rounded"
              to="/servicios"
              onClick={() => setExpanded(false)}
            >
              Acerca de nostros
            </StyledNavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
