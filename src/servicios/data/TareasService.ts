import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPFI } from "@pnp/sp";
import SharePointApi from "../api/SharePointApi";
import { ListasSharePoint } from "../../constantes/ListasSharePoint";
import { ITarea, Tarea } from "../../modelos/Tarea";
import { IResumenTareasProyecto } from "../../modelos/ResumenTareasProyecto";

export class TareasService {
  private sp: SPFI;

  private readonly tareaSelect: string[] = [
    "Id",
    "Title",
    "Estado",
    "PorcentajeCompletado",
    "HorasEstimadas",
    "ProyectoRelacionado/Id",
    "AsignadoA/Title",
  ];

  private readonly tareaExpand: string[] = ["ProyectoRelacionado", "AsignadoA"];

  constructor(context: WebPartContext) {
    this.sp = new SharePointApi().getSP(context);
  }

  /**
   * Obtiene todas las tareas de un proyecto
   */
  public async obtenerTareasPorProyecto(proyectoId: number): Promise<ITarea[]> {
    const items = await this.sp.web.lists
      .getByTitle(ListasSharePoint.TAREAS)
      .items.filter(`ProyectoRelacionado/Id eq ${proyectoId}`)
      .select(...this.tareaSelect)
      .expand(...this.tareaExpand)();

    return items.map(
      (item) =>
        new Tarea(
          item.Id,
          item.Title,
          item.Estado,
          item.ProyectoRelacionado?.Id,
          item.PorcentajeCompletado ?? 0,
          item.HorasEstimadas ?? 0,
          item.AsignadoA?.Title
        )
    );
  }

  /**
   * Resumen para dashboard
   */
  public async obtenerResumenPorProyecto(
    proyectoId: number
  ): Promise<IResumenTareasProyecto> {
    const tareas = await this.obtenerTareasPorProyecto(proyectoId);

    const total = tareas.length;
    const completadas = tareas.filter((t) => t.estado === "Completed").length;

    const bloqueadas = tareas.filter((t) => t.estado === "Blocked").length;

    const totalHoras = tareas.reduce(
      (sum, t) => sum + (t.horasEstimadas || 0),
      0
    );

    const porcentajeProyecto =
      total === 0
        ? 0
        : Math.round(
            tareas.reduce((sum, t) => sum + t.porcentajeCompletado, 0) / total
          );

    return {
      proyectoId,
      totalTareas: total,
      tareasCompletadas: completadas,
      tareasBloqueadas: bloqueadas,
      porcentajeProyecto,
      totalHoras,
    };
  }
}
