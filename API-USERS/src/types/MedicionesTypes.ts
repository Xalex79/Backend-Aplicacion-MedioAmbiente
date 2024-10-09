import { Double } from "bson";
import { Repository } from "./RepositoryTypes";

/**
 * @brief Define la estructura de los datos de una medición.
 * @author Alejandro Rosado
 */
export interface Medicion {
  Concrentracion_ppm: Double;
  temperatura: Double;
  latitud: Double;
  longitud: Double;
}

/**
 * @brief Define la interfaz del repositorio de mediciones.
 * @author Alejandro Rosado
 */
export interface IMedicionRepository extends Repository<Medicion> {}

/**
 * @brief Define la interfaz del servicio de mediciones.
 * @author Alejandro Rosado
 */
export interface IMedicionService {
  createMedicion(medicion: Medicion): Promise<Medicion>;
  findMediciones(): Promise<Medicion[]>;
  findMedicionesById(id: string): Promise<Medicion | null>;
  updateMedicion(id: string, medicion: Partial<Medicion>): Promise<Medicion | null>;
  deleteMedicion(id: string): Promise<boolean>;
}