import routes from "@routes/routes";
import express, { Application } from "express";
import morgan from "morgan";

/**
 * @brief Inicia la aplicación Express y configura los middleware y rutas.
 * @author Alejandro Rosado
 */
const app: Application = express();

// Configura el middleware para analizar JSON en las solicitudes
app.use(express.json());

// Configura el middleware para registrar las solicitudes y respuestas en el registro
app.use(morgan("dev"));

// Monta las rutas de la API en el punto de montaje "/api/v1"
app.use("/api/v1", routes());

export default app;