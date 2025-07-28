import { CheckCircle } from "@mui/icons-material";
import {
  Box,
  Grid2,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { IService } from "../../../general/contexts/DataContext/interfaces/IService";
interface Props {
  open: boolean;
  handleClose: () => void;
  fullScreen?: boolean;
  filteredServices: IService[];
  toggleService: (id: number) => void;
  selectedServices: number[];
}
export const DialogServices: React.FC<Props> = ({
  open,
  handleClose,
  fullScreen,
  filteredServices,
  toggleService,
  selectedServices,
}) => {
  return (
    <Dialog
      open={open}
      fullScreen={fullScreen}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      maxWidth={"md"}
    >
      <DialogTitle id="responsive-dialog-title">
        {"¿Qué servicios desea?"}
      </DialogTitle>
      <DialogContent>
        <Grid2
          container
          rowSpacing={2}
          columnSpacing={{ xs: 5, sm: 3, md: 3 }}
          columns={12}
        >
          {filteredServices.map((service) => (
            <Grid2 size={{ xs: 6, md: 4 }} key={service.id}>
              <div
                className="d-flex justify-content-center align-items-center"
                onClick={() => toggleService(service.id)}
              >
                <Stack
                  sx={{
                    width: "100%",
                    maxWidth: {
                      xs: 180,
                      sm: 200,
                      md: 200,
                    },
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "1",
                      borderRadius: "8px",
                      cursor: "pointer",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      component={motion.img}
                      src={service.imageBase64}
                      alt={service.name}
                      initial={false}
                      animate={{
                        filter: selectedServices.includes(service.id)
                          ? "brightness(0.7)"
                          : "none",
                      }}
                      transition={{ duration: 0.3 }}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />

                    <AnimatePresence>
                      {selectedServices.includes(service.id) && (
                        <motion.div
                          key="overlay"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{
                            position: "absolute",
                            inset: 0,
                            backgroundColor: "rgba(255,255,255,0.7)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 8,
                          }}
                        >
                          <CheckCircle sx={{ fontSize: 48, color: "green" }} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Box>

                  <Typography
                    className="mb-0"
                    sx={{
                      fontSize: {
                        xs: "0.8rem",
                        sm: "0.9rem",
                        md: "1rem",
                      },
                      textAlign: "center",
                    }}
                  >
                    {service.name}
                  </Typography>
                  <small>
                    <strong>${service.price}</strong>
                  </small>
                </Stack>
              </div>
            </Grid2>
          ))}
        </Grid2>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Listo
        </Button>
      </DialogActions>
    </Dialog>
  );
};
