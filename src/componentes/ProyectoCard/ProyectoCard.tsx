import * as React from "react";
import { IProyectoCardProps } from "./IProyectoCardProps";
import styles from "./ProyectoCard.module.scss";

const ProjectCard: React.FC<IProyectoCardProps> = ({ proyecto, resumen }) => {
    const progreso = resumen.porcentajeProyecto;
  
    const tieneBloqueadas = resumen.tareasBloqueadas > 0;
    const bajoAvance =
      progreso < 50 && proyecto.estado === "Active";
    const altoAvance = progreso >= 80;
  
    return (
      <div
        className={`${styles.card} ${
          tieneBloqueadas ? styles.blocked : ""
        }`}
      >
        {/* Header */}
        <div className={styles.header}>
          <h3 className={styles.title}>{proyecto.nombre}</h3>
          <span className={styles.estado}>{proyecto.estado}</span>
        </div>
  
        {/* Info */}
        <div className={styles.info}>
          <div>
            <strong>Gerente:</strong> {proyecto.gerente}
          </div>
          <div>
            <strong>Presupuesto:</strong> $
            {proyecto.presupuestoTotal.toLocaleString()}
          </div>
        </div>
  
        {/* Progreso */}
        <div className={styles.progressContainer}>
          <div className={styles.progressInfo}>
            <span>
              {resumen.tareasCompletadas}/{resumen.totalTareas} tareas
            </span>
            <span>{progreso}%</span>
          </div>
  
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progreso}%` }}
            />
          </div>
        </div>
  
        {/* Indicadores */}
        <div className={styles.indicators}>
          {tieneBloqueadas && (
            <span className={styles.badgeBlocked}>Bloqueadas</span>
          )}
          {bajoAvance && (
            <span className={styles.badgeLow}>Bajo avance</span>
          )}
          {altoAvance && (
            <span className={styles.badgeHigh}>Alto avance</span>
          )}
        </div>
      </div>
    );
  };
  
  export default ProjectCard;