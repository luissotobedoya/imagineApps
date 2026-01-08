import * as React from "react";
import { SearchBox } from "@fluentui/react";
import styles from "./BuscadorProyectos.module.scss";
import { IBuscadorProyectosProps } from "./IBuscadorProyectosProps";

const BuscadorProyectos: React.FC<IBuscadorProyectosProps> = ({
  valor,
  onBuscar,
}) => {
  return (
    <div className={styles.buscador}>
      <SearchBox
        placeholder="Buscar proyecto por nombre"
        value={valor}
        onChange={(_, newValue) => onBuscar(newValue || "")}
        disableAnimation
      />
    </div>
  );
};

export default BuscadorProyectos;
