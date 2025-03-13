import styled from "styled-components";

interface StyledButtonProps {
    variant?: "outline" | "filled";
  }
  
  export const StyledButton = styled.button<StyledButtonProps>`
    border: 2px solid #eab308;
    color: ${({ variant }) => (variant === "outline" ? "#eab308" : "black")};
    background-color: ${({ variant }) => (variant === "outline" ? "transparent" : "#eab308")};
    padding: 10px 20px;
    cursor: pointer;
    transition: all 0.3s ease;
  
    &:hover {
      background-color: #eab308;
      color: black;
    }
    &:active{
      background-color: #eab308;
      color: black;
      
    }
  `;
  
