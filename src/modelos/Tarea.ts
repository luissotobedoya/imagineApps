export interface ITarea {
  id: number;
  nombre: string;
  estado: string;
  proyectoId: number;
  porcentajeCompletado: number;
  horasEstimadas: number;
  asignadoA?: string;
}

export class Tarea implements ITarea {
  constructor(
    public id: number,
    public nombre: string,
    public estado: string,
    public proyectoId: number,
    public porcentajeCompletado: number,
    public horasEstimadas: number,
    public asignadoA?: string
  ) {}
}
