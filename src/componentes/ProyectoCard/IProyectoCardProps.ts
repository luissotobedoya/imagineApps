import { IProyecto } from "../../modelos/Proyecto";
import { IResumenTareasProyecto } from "../../modelos/ResumenTareasProyecto";

export interface IProyectoCardProps {
  proyecto: IProyecto;
  resumen: IResumenTareasProyecto;
}
