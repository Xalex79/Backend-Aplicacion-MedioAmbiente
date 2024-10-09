import { MedicionModel } from "../src/models/Mediciones"; // Importar el modelo
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

// Datos de prueba
const mediciones = [
  {
    Concrentracion_ppm: 200.5,
    temperatura: 25.3,
    latitud: -38.4161,
    longitud: -63.6167
  },
  {
    Concrentracion_ppm: 150.3,
    temperatura: 22.5,
    latitud: -34.6037,
    longitud: -58.3816
  }
];

describe("Medicion Service Test", () => {
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

  it("Debe obtener todas las mediciones", async () => {
    // Inserta las mediciones de prueba en la base de datos
    await MedicionModel.insertMany(mediciones);

    // Obtén todas las mediciones de la base de datos
    const result = await MedicionModel.find();

    // Verifica que se obtuvieron correctamente
    expect(result.length).toBe(2);
    expect(result[0].Concrentracion_ppm).toBe(mediciones[0].Concrentracion_ppm);
    expect(result[1].temperatura).toBe(mediciones[1].temperatura);
  });
});
