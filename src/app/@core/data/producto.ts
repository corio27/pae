import { TipoAlimento } from './tipoAlimento';
export class Producto {
  Id: number;
  Nombre: string;
  Codigo: number;
  CodigoNutricional: number;
  TipoAlimentoId: TipoAlimento;
}
