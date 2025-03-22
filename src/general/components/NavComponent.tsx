import { Container, Nav, Navbar } from "react-bootstrap";
import { StyledNavLink } from "./StyledNavLink";

export const NavComponent = () => {
  return (
    <Navbar bg="black" data-bs-theme="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#">
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

        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav>
            <StyledNavLink className="rounded me-5" to="/">
              Inicio
            </StyledNavLink>
            <StyledNavLink className="rounded me-5" to="/citas">
              Citas
            </StyledNavLink>
            <StyledNavLink className="rounded" to="/services">
              Servicios
            </StyledNavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
