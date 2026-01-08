export interface IProyecto {
  id: number;
  nombre: string;
  codigo: string;
  gerente: string;
  presupuestoTotal: number;
  fechaInicio: Date;
  fechaFin: Date;
  estado: string;
  prioridad: string;
}
export class Proyecto implements IProyecto {
  constructor(
    public id: number,
    public nombre: string,
    public codigo: string,
    public gerente: string,
    public presupuestoTotal: number,
    public fechaInicio: Date,
    public fechaFin: Date,
    public estado: string,
    public prioridad: string
  ) {}
}
