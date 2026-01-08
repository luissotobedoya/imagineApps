import * as React from "react";
import { Dropdown, IDropdownOption } from "@fluentui/react/lib/Dropdown";
import styles from "./FiltroProyectos.module.scss";
import { IFiltroProyectosProps } from "./IFiltroProyectosProps";

export default class FiltroProyectos extends React.Component<IFiltroProyectosProps> {

  private opcionesEstado: IDropdownOption[] = [
    { key: "Todos", text: "Todos" },
    { key: "Planning", text: "Planning" },
    { key: "Active", text: "Active" },
    { key: "Completed", text: "Completed" },
    { key: "Cancelled", text: "Cancelled" }
  ];

  public render(): React.ReactElement<IFiltroProyectosProps> {
    const {
      estadoSeleccionado,
      gerenteSeleccionado,
      gerentesDisponibles,
      onEstadoChange,
      onGerenteChange
    } = this.props;

    const opcionesGerentes: IDropdownOption[] = [
      { key: "Todos", text: "Todos" },
      ...gerentesDisponibles.map((g) => ({
        key: g,
        text: g
      }))
    ];

    return (
      <div className={styles.filtrosContainer}>
        {/* Filtro Estado */}
        <Dropdown
          label="Estado"
          selectedKey={estadoSeleccionado}
          options={this.opcionesEstado}
          onChange={(_, option) =>
            onEstadoChange(option?.key as string)
          }
          className={styles.dropdown}
        />

        {/* Filtro Gerente */}
        <Dropdown
          label="Gerente"
          selectedKey={gerenteSeleccionado}
          options={opcionesGerentes}
          onChange={(_, option) =>
            onGerenteChange(option?.key as string)
          }
          className={styles.dropdown}
        />
      </div>
    );
  }
}
