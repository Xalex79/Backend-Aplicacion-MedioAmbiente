import mongoose from "mongoose";
import dotenv from "dotenv";

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Asegurarse de que la variable MONGODB_URL_LOCAL esté definida
const mongoDbURL = process.env.MONGODB_URL_LOCAL as string;

if (!mongoDbURL) {
  throw new Error("La URL de MongoDB no está definida en el archivo .env");
}

export default (async () => {
  try {
    // Conectar a MongoDB sin las opciones 'useNewUrlParser' y 'useUnifiedTopology'
    await mongoose.connect(mongoDbURL);
    console.log("Mongodb Connected!!!");
  } catch (error) {
    // Mostrar el error en caso de que falle la conexión
    console.error("Error al conectar a MongoDB :>> ", error);
    process.exit(1); // Salir del proceso con error
  }
})();
