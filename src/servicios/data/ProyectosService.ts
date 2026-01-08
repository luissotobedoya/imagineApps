import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPFI } from "@pnp/sp";
import SharePointApi from "../api/SharePointApi";
import { IProyecto, Proyecto } from "../../modelos/Proyecto";
import { ListasSharePoint } from "../../constantes/ListasSharePoint";

export class ProyectosService {
  private sp: SPFI;

  private readonly proyectoSelect: string[] = [
    "Id",
    "Title",
    "Codigo",
    "PresupuestoTotal",
    "FechaInicio",
    "FechaFin",
    "Estado",
    "Prioridad",
    "Gerente/Title",
  ];

  private readonly proyectoExpand: string[] = ["Gerente"];

  constructor(context: WebPartContext) {
    this.sp = new SharePointApi().getSP(context);
  }

  public async obtenerProyectos(): Promise<IProyecto[]> {
    try {
      const items = await this.sp.web.lists
        .getByTitle(ListasSharePoint.PROYECTOS)
        .items.select(...this.proyectoSelect)
        .expand(...this.proyectoExpand)();

      return items.map(
        (item) =>
          new Proyecto(
            item.Id,
            item.Title,
            item.Codigo,
            item.Gerente?.Title ?? "",
            item.PresupuestoTotal,
            item.FechaInicio ? new Date(item.FechaInicio) : null,
            item.FechaFin ? new Date(item.FechaFin) : null,
            item.Estado,
            item.Prioridad
          )
      );
    } catch (error) {
      console.error("Error obteniendo proyectos:", error);
      throw new Error("No se pudo obtener la lista de proyectos.");
    }
  }
}
