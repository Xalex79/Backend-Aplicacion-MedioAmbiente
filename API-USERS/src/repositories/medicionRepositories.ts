import { MedicionModel } from "@models/Mediciones";
import { IMedicionRepository, Medicion } from "types/MedicionesTypes";

export class MedicionRepository implements IMedicionRepository {
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