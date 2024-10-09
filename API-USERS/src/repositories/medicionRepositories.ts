import { MedicionModel } from "@models/Mediciones";
import { IMedicionRepository, Medicion } from "types/MedicionesTypes";

/**
* @brief Proporciona métodos de acceso a datos para el modelo Medicion.
* @author Alejandro Rosado
* @implements {IMedicionRepository}
*/
export class MedicionRepository implements IMedicionRepository {

  /**
  * Crea una nueva medida.
  * @param {Medicion} data - Los datos de la medida.
  * @returns {Promise<Medicion>} - La medida creada.
  * Comentarios similares para find (buscar), findById (buscar por id), update (actualizar valor), delete (borrar medida)
  */
  async create(data: Medicion): Promise<Medicion> {
    const newMedicion = new MedicionModel(data);
    return await newMedicion.save();
  }

  async find(): Promise<Medicion[]> {
    return await MedicionModel.find().exec();
  }

  async findById(id: string): Promise<Medicion | null> {
    return await MedicionModel.findById(id).exec();
  }

  async update(id: string, data: Partial<Medicion>): Promise<Medicion | null> {
    return await MedicionModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await MedicionModel.findByIdAndDelete(id).exec();
    return deleted !== null;
  }
}