export interface IFiltroProyectosProps {
    estadoSeleccionado: string;
    gerenteSeleccionado: string;
    gerentesDisponibles: string[];
  
    onEstadoChange: (estado: string) => void;
    onGerenteChange: (gerente: string) => void;
  }