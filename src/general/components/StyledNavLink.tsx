import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const StyledNavLink = styled(NavLink)`
color: #b3b3b3;
text-decoration: none;
font-size: 16px;
font-weight: 600;
padding: 12px;
border-radius: 5px;
transition: color 0.3s ease;

&:hover {
  color: #eab308;
}

&.active {
  font-weight: bold;
  background-color:transparent;
  border-bottom: 2px solid #eab308;
}
  }
`;
