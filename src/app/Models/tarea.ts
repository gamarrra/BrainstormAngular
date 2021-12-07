import { IsubTarea } from "./subTarea";
import { Iuser } from "./user";

export interface Itarea {
  tareaId: number;
  descripcion: string;
  fechaComprometida: any;
  usuarioCreador: Iuser;
  estado: string;
  usuarioEmailResponsable: any;
  listaSubTareas: IsubTarea[];
  }
