import mongoose, { Schema } from "mongoose";
import { Medicion } from "types/MedicionesTypes";

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
    versionKey: false
  }
);

export const MedicionModel = mongoose.model<Medicion>("Medicion", MedicionSchema);