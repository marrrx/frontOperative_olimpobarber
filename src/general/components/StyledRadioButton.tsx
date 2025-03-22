import styled from "styled-components";


export const StyledRadioButton = styled.label`
  display: inline-block;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  border: 2px solid #eab308;
  color: #eab308;
  background-color: transparent;
  border-radius: 0.375rem; /* Similar a Bootstrap */
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #eab308;
    color: #fff;
  }

  &:active {
    background-color: #d4a107;
    border-color: #d4a107;
  }
`;
