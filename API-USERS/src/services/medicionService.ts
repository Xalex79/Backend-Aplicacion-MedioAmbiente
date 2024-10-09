import { IMedicionRepository, IMedicionService, Medicion } from "types/MedicionesTypes";

/**
 * @brief Implementa los métodos del servicio de mediciones, delegando las operaciones en el repositorio correspondiente.
 * @author Alejandro Rosado
 * @implements {IMedicionService}
 */
export class MedicionService implements IMedicionService {
  private medicionRepository: IMedicionRepository;

  constructor(medicionRepository: IMedicionRepository) {
    this.medicionRepository = medicionRepository;
  }

  async createMedicion(user: Medicion): Promise<Medicion> {
    return this.medicionRepository.create(user);
  }

  async findMediciones(): Promise<Medicion[]> {
    return this.medicionRepository.find();
  }

  async findMedicionesById(id: string): Promise<Medicion | null> {
    return this.medicionRepository.findById(id);
  }

  async updateMedicion(id: string, user: Partial<Medicion>): Promise<Medicion | null> {
    return this.medicionRepository.update(id, user);
  }

  async deleteMedicion(id: string): Promise<boolean> {
    return this.medicionRepository.delete(id);
  }
}