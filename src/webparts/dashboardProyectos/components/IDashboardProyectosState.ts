import { IProyecto } from "../../../modelos/Proyecto";

export interface IDashboardProyectosState {
  proyectos: IProyecto[];
  loading: boolean;
  error: any;
}
