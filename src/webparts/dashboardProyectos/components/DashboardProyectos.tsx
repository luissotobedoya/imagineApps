import * as React from "react";
import styles from "./DashboardProyectos.module.scss";
import { IDashboardProyectosProps } from "./IDashboardProyectosProps";
import {
  IDashboardProyectosState,
  IProyectoDashboard,
} from "./IDashboardProyectosState";
import { ProyectosService } from "../../../servicios/data/ProyectosService";
import { TareasService } from "../../../servicios/data/TareasService";
import Spinner from "../../../componentes/spinner/Spinner";
import ProyectoCard from "../../../componentes/ProyectoCard/ProyectoCard";
import BuscadorProyectos from "../../../componentes/buscadorProyectos/BuscadorProyectos";

export default class DashboardProyectos extends React.Component<
  IDashboardProyectosProps,
  IDashboardProyectosState
> {
  private proyectoService: ProyectosService;
  private tareasService: TareasService;

  constructor(props: IDashboardProyectosProps) {
    super(props);

    this.state = {
      proyectos: [],
      loading: true,
      error: null,
      textoBusqueda: "",
    };

    this.proyectoService = new ProyectosService(this.props.context);
    this.tareasService = new TareasService(this.props.context);
  }

  public async componentDidMount(): Promise<void> {
    try {
      const proyectos = await this.proyectoService.obtenerProyectos();

      const proyectosDashboard: IProyectoDashboard[] = await Promise.all(
        proyectos.map(async (proyecto) => {
          const resumen =
            await this.tareasService.obtenerResumenPorProyecto(proyecto.id);

          return {
            ...proyecto,
            resumen,
          };
        })
      );

      this.setState({
        proyectos: proyectosDashboard,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error al cargar los datos:", error);
      this.setState({
        error: "Error al cargar los datos",
        loading: false,
      });
    }
  }

  private onBuscarProyecto = (texto: string): void => {
    this.setState({ textoBusqueda: texto });
  };

  public render(): React.ReactElement<IDashboardProyectosProps> {
    const { proyectos, loading, error, textoBusqueda } = this.state;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <div className={styles.errorMessage}>{error}</div>;
    }

    const texto = textoBusqueda.toLowerCase();

    const proyectosFiltrados = proyectos.filter(
      (p) => p.nombre.toLowerCase().indexOf(texto) !== -1
    );

    return (
      <div className={styles.dashboardProyectos}>
        <h2 className={styles.title}>Dashboard de Proyectos</h2>

        {/* Barra de herramientas */}
        <div className={styles.toolbar}>
          <BuscadorProyectos
            valor={textoBusqueda}
            onBuscar={this.onBuscarProyecto}
          />
        </div>

        {proyectosFiltrados.length === 0 ? (
          <div className={styles.emptyMessage}>
            No hay proyectos para mostrar
          </div>
        ) : (
          <div className={styles.projectGrid}>
            {proyectosFiltrados.map((proyecto) => (
              <ProyectoCard
                key={proyecto.id}
                proyecto={proyecto}
                resumen={proyecto.resumen}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}
