import { useState } from "react";
import { Collapse } from "react-bootstrap";

interface props {
  title: string;
  children: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
}

export const Expand: React.FC<props> = ({ title, children,onToggle,isExpanded }) => {

  return (
    <div className="mb-4">
      <div
        className="d-flex justify-content-between align-items-center px-3 py-2 bg-light rounded border"
        style={{ cursor: "pointer" }}
        onClick={onToggle}
      >
        <h4 className="mb-0 fw-bold">{title}</h4>
        <i
          className={`bi bi-chevron-down transition ${
            isExpanded ? "rotate-180" : ""
          }`}
          style={{
            transition: "transform 0.3s",
            transform: isExpanded ? "rotate(180deg)" : "none",
          }}
        ></i>
      </div>

      <Collapse in={isExpanded}>
        <div>{children}</div>
      </Collapse>
    </div>
  );
};
