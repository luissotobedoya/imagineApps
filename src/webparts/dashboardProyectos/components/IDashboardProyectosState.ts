import { IProyecto } from "../../../modelos/Proyecto";
import { IResumenTareasProyecto } from "../../../modelos/ResumenTareasProyecto";

export interface IProyectoDashboard extends IProyecto {
  resumen: IResumenTareasProyecto;
}

export interface IDashboardProyectosState {
  proyectos: IProyectoDashboard[];
  loading: boolean;
  error: string | null;
  textoBusqueda: string;
  estadoSeleccionado: string; 
  gerenteSeleccionado: string;  
  gerentesDisponibles: string[]; 
}
