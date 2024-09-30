import { Double } from "bson";
import { Repository } from "./RepositoryTypes";

export interface Medicion {
  Concrentracion_ppm: Double;
  temperatura: Double;
  latitud: Double;
  longitud: Double;
}

export interface IMedicionRepository extends Repository<Medicion> {}

export interface IMedicionService {
  createMedicion(Medicion: Medicion): Promise<Medicion>;
  findMediciones(): Promise<Medicion[]>;
  findMedicionesById(id: string): Promise<Medicion | null>;
  updateMedicion(id: string, Medicion: Partial<Medicion>): Promise<Medicion | null>;
  deleteMedicion(id: string): Promise<boolean>;
}