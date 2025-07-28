import { SxProps, Theme } from "@mui/material";

export const imageContainerSx: SxProps<Theme> = {
  position: "relative",
  width: "100%",
  aspectRatio: "1",
  borderRadius: "8px",
  cursor: "pointer",
  overflow: "hidden",
};

export const imageSx = (selected: boolean): SxProps<Theme> => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "8px",
  transition: "filter 0.3s",
  filter: selected ? "brightness(0.7)" : "none",
});

export const overlaySx: SxProps<Theme> = {
  position: "absolute",
  inset: 0,
  bgcolor: "rgba(255,255,255,0.7)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "8px",
};

export interface ServiceImageProps {
  service: {
    id: number;
    imageBase64: string;
    name: string;
  };
  selectedServices: number[];
  onToggleSelect: (id: number) => void;
}
