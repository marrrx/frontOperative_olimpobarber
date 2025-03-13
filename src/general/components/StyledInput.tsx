import styled from "styled-components";
import { Form } from "react-bootstrap";

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StyledLabel = styled(Form.Label)`
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  background: white;
  padding: 0 5px;
  color: #aaa;
  font-size: 14px;
  transition: 0.3s ease-in-out;
  pointer-events: none;
`;

export const StyledInput = styled(Form.Control)`
  width: 100%;
  padding: 12px;
  border: 2px solid #ccc;
  border-radius: 5px;
  outline: none;
  font-size: 16px;

  &:focus {
    border-color: #eab308;
    box-shadow: none;
  }

  &:focus + ${StyledLabel}, &:not(:placeholder-shown) + ${StyledLabel} {
    top: 0;
    font-size: 12px;
    color: #eab308;
  }
`;
