import styled from "styled-components";
import { motion } from "framer-motion";

interface StyledButtonProps {
  variant?: "outline" | "filled";
}

export const StyledBackButton = styled(motion.button)<StyledButtonProps>`
  border: 2px solid rgb(160, 160, 160);
  color: ${({ variant }) => (variant === "outline" ? "rgb(100, 100, 100)" : "white")};
  background-color: ${({ variant }) =>
    variant === "outline" ? "transparent" : "rgb(150, 150, 150)"};
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgb(180, 180, 180);
    color: black;
  }

  &:active {
    background-color: rgb(200, 200, 200);
    color: black;
  }
`;

