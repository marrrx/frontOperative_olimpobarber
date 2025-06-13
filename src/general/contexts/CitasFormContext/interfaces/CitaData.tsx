export interface CitaData {
  client: {
    name: string;
    apellido: string;
    fecha_nacimiento: string;
    telefono:string;
  };
  branchId: number;
  workerId: number;
  date: string;
  time: string;
  services: number[];
  total: number;
}
