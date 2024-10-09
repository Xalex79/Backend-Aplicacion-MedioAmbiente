import { MedicionModel } from "../src/models/Mediciones"; // Importar el modelo
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

// Datos de prueba
const nuevaMedicion = {
  Concrentracion_ppm: 200.5,
  temperatura: 25.3,
  latitud: -38.4161,
  longitud: -63.6167
};

describe("Medicion Model Test", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    // Inicia MongoDB en memoria
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    // Cierra la conexión y detén el servidor de MongoDB en memoria
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  it("Debe crear una nueva medición correctamente", async () => {
    // Crear una nueva medición
    const medicion = new MedicionModel(nuevaMedicion);
    const savedMedicion = await medicion.save();

    // Verifica que la medición se haya guardado correctamente
    expect(savedMedicion._id).toBeDefined();
    expect(savedMedicion.Concrentracion_ppm).toBe(nuevaMedicion.Concrentracion_ppm);
    expect(savedMedicion.temperatura).toBe(nuevaMedicion.temperatura);
    expect(savedMedicion.latitud).toBe(nuevaMedicion.latitud);
    expect(savedMedicion.longitud).toBe(nuevaMedicion.longitud);
  });
});
