export interface CitaData {
  client: {
    name: string;
    apellido: string;
    fecha_nacimiento: string;
  };
  branchId: number;
  workerId: number;
  date: string;
  time: string;
  services: number[];
  total: number;
}
