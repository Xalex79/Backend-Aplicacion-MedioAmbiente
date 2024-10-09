import mongoose, { Schema } from "mongoose";
import { Medicion } from "types/MedicionesTypes";

/**
* @brief Define el esquema para un documento de medición en la colección MongoDB.
* @author Alejandro Rosado
* @property {number} Concrentracion_ppm - La concentración en partes por millón.
* @property {number} temperatura - La temperatura en grados.
* @property {number} latitud - La coordenada de latitud.
* @property {number} longitud - La coordenada de longitud.
*/

const MedicionSchema: Schema = new Schema<Medicion>(
  {
    Concrentracion_ppm: {
      type: Number,
      required: true
    },
    temperatura: {
      type: Number,
      required: true,
    },
    latitud: {
      type: Number,
      required: true,
    },
    longitud: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "mediciones" // Especificar el nombre de la colección aquí
  }
);

export const MedicionModel = mongoose.model<Medicion>("Medicion", MedicionSchema);