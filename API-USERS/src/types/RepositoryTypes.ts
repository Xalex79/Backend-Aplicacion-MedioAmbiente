/**
 * @brief Define la interfaz genérica de un repositorio.
 * @author Alejandro Rosado
 * @template T - El tipo de entidad que maneja el repositorio.
 */
export interface Repository<T = unknown> {
  create(data: T): Promise<T>;
  find(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  update(id: string, data: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}