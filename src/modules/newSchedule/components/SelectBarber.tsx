import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { Container } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { IWorker } from "../../../general/contexts/DataContext/interfaces/IWorker";
import { CardWorker } from "./CardWorker";

interface SelectBarberProps {
  branches: { id: number; name: string }[];
  activeAccordion: string | null;
  readyBranches: Record<number, boolean>;
  workersByBranch: Record<number, IWorker[]>;
  handleAccordionClick: (branchId: number) => void;
  loading?: boolean;
  loadingBranchId?: number | null;
}

export const SelectBarber: React.FC<SelectBarberProps> = ({
  branches,
  activeAccordion,
  readyBranches,
  workersByBranch,
  handleAccordionClick,
  loading,
  loadingBranchId,
}) => {

  return (
    <Container>
    <List component="nav" className="barbers-container">
      {branches.map((branch) => {
        const isOpen = activeAccordion === branch.id.toString();
        const isReady = readyBranches[branch.id] ?? false;

        return (
          <Box
            key={branch.id}
            sx={{ mb: 1, border: "1px solid #ccc", borderRadius: 2 }}
          >
            <ListItemButton onClick={() => handleAccordionClick(branch.id)}>
              <ListItemText
                primary={
                  <Typography variant="subtitle1">{branch.name}</Typography>
                }
              />
              {isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse
              in={isOpen && isReady}
              timeout={500}
              collapsedSize={0}
              unmountOnExit
            >
              <Box sx={{ p: 2 }} >
            
                  <CardWorker
                    barbers={workersByBranch[branch.id] ?? []}
                    loading={loading && loadingBranchId === branch.id}
                  />
             
              </Box>
            </Collapse>
          </Box>
        );
      })}
    </List>
    </Container>
  );
};
