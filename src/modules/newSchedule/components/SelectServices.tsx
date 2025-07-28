import {
  Button,
  FormControl,
  FormHelperText,
  SelectChangeEvent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { CitasFormContext } from "../../../general/contexts/CitasFormContext/CitasFormContext";
import { DialogServices } from "./DialogServices";
interface Props {
  services: any[];
}
export const SelectServices: React.FC<Props> = ({ services }) => {
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const { citaData, updateCitaData, totalTemp, setTotalTemp } =
    useContext(CitasFormContext);

  //Abrir o cerrar modal de servicios
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //funcion para seleccionar servicios
  const handleServices = (selectedIds: number[]) => {
    setSelectedServices(selectedIds);

    const total = selectedIds.reduce((acc, serviceId) => {
      const service = services.find((s) => s.id === serviceId);
      return acc + (service ? service.price : 0);
    }, 0);

    setTotalTemp(total);
    updateCitaData({
      services: selectedIds,
      total: total,
    });
  };
  const toggleService = (id: number) => {
    let newSelected: number[] = [];

    if (selectedServices.includes(id)) {
      newSelected = selectedServices.filter((sid) => sid !== id);
    } else {
      newSelected = [...selectedServices, id];
    }

    handleServices(newSelected);
  };

  const edadCliente = citaData.client.fecha_nacimiento;
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      if (edadCliente === "1") {
        return (
          service.name === "Corte de niño" || !service.name.includes("Corte")
        );
      }
      if (edadCliente === "3") {
        return (
          service.name === "Corte de adulto mayor" ||
          !service.name.includes("Corte")
        );
      }
      return service.name === "Corte" || !service.name.includes("Corte");
    });
  }, [edadCliente, services]);

  // useEffect para cargar servicios seleccionados desde citaData
  useEffect(() => {
    if (citaData.services && citaData.services.length > 0) {
      setSelectedServices(citaData.services);
    }
  }, [citaData.services]);

  return (
    <Container>
      <FormControl
        fullWidth
        variant="outlined"
        disabled={citaData.client.fecha_nacimiento === ""}
      >
        <Button
          variant="outlined"
          onClick={handleClickOpen}
          disabled={!citaData.client.fecha_nacimiento}
        >
          Ver servicios
        </Button>
        <DialogServices
          toggleService={toggleService}
          selectedServices={selectedServices}
          handleClose={handleClose}
          open={open}
          fullScreen={fullScreen}
          filteredServices={filteredServices}
        />
        {citaData.client.fecha_nacimiento === "" && (
          <FormHelperText>Primero debes seleccionar tu edad.</FormHelperText>
        )}
      </FormControl>
    </Container>
  );
};
