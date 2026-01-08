import * as React from "react";
import styles from "./DashboardProyectos.module.scss";
import { IDashboardProyectosProps } from "./IDashboardProyectosProps";
import { IDashboardProyectosState } from "./IDashboardProyectosState";
import { ProyectosService } from "../../../servicios/data/ProyectosService";
import { IProyecto } from "../../../modelos/Proyecto";
import Spinner from "../../../componentes/spinner/Spinner";

export default class DashboardProyectos extends React.Component<
  IDashboardProyectosProps,
  IDashboardProyectosState
> {
  private proyectoService: ProyectosService;

  constructor(props: IDashboardProyectosProps) {
    super(props);

    this.state = {
      proyectos: [],
      loading: true,
      error: null,
    };

    this.proyectoService = new ProyectosService(this.props.context);
  }

  public async componentDidMount(): Promise<void> {
    try {
      const proyectos: IProyecto[] =
        await this.proyectoService.obtenerProyectos();

      this.setState({
        proyectos,
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

  public render(): React.ReactElement<IDashboardProyectosProps> {
    const { proyectos, loading, error } = this.state;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <div className={styles.errorMessage}>{error}</div>;
    }

    return (
      <div className={styles.dashboardProyectos}>
        <h2 className={styles.title}>Dashboard de Proyectos</h2>

        {proyectos.length === 0 ? (
          <div className={styles.emptyMessage}>
            No hay proyectos para mostrar
          </div>
        ) : (
          <ul className={styles.projectList}>
            {proyectos.map((proyecto) => (
              <li key={proyecto.id} className={styles.projectItem}>
                <strong>{proyecto.nombre}</strong> – {proyecto.estado}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
