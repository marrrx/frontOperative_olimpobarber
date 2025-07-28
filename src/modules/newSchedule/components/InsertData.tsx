import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";

interface Props {
  updateCitaData: (data: any) => void;
  citaData: any;
}

export const InsertData: React.FC<Props> = ({ updateCitaData, citaData }) => {
  const [telefonoError, setTelefonoError] = useState(false);

  return (
    <>
      <div className="d-flex flex-column flex-lg-row ps-3 pe-3">
        <TextField
          label="Nombre"
          value={citaData.client.name}
          onChange={(e) =>
            updateCitaData({
              client: { ...citaData.client, name: e.target.value },
            })
          }
        />
        <TextField
          label="Apellido"
          className="ms-lg-3 mt-3 mt-lg-0"
          value={citaData.client.apellido}
          onChange={(e) =>
            updateCitaData({
              client: { ...citaData.client, apellido: e.target.value },
            })
          }
        />
        <FormControl error={telefonoError} className="ms-lg-3 mt-3 mt-lg-0">
          <PhoneInput
            country="mx"
            value={citaData.client.telefono}
            specialLabel="Teléfono"
            onChange={(value) => {
              updateCitaData({
                client: { ...citaData.client, telefono: value },
              });
              const localPart = value.startsWith("52") ? value.slice(2) : value;
              setTelefonoError(localPart.length !== 10);
            }}
            containerStyle={{ width: "100%" }}
            inputStyle={{ width: "100%", height: 56 }}
            inputClass={telefonoError ? "Mui-error" : ""}
          />
          {telefonoError && (
            <FormHelperText>El número debe tener 10 dígitos</FormHelperText>
          )}
        </FormControl>
        <FormControl
          sx={{
            minWidth: 120,
          }}
          className="ms-lg-3 mt-3 mt-lg-0"
          variant="outlined"
        >
          <InputLabel id="edad-select-label">Edad</InputLabel>
          <Select
            labelId="edad-select-label"
            id="edad-select"
            value={citaData.client.fecha_nacimiento.toString()}
            label="Edad"
            onChange={(event: SelectChangeEvent) => {
              const value = event.target.value;
              updateCitaData({
                client: {
                  ...citaData.client,
                  fecha_nacimiento: value,
                },
              });
            }}
          >
            <MenuItem value="1">Niño</MenuItem>
            <MenuItem value="2">Adulto</MenuItem>
            <MenuItem value="3">Adulto mayor</MenuItem>
          </Select>
        </FormControl>
      </div>
    </>
  );
};
