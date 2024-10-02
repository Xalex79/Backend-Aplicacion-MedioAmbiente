import express from 'express'; // Asegúrate de importar express
import dotenv from "dotenv";
import "@config/mongodb";
import cors from "cors";  // Importar el paquete CORS
import routes from "@routes/routes"; // Importar las rutas

dotenv.config();

const app = express(); // Inicializar express

const port = process.env.PORT || 3000;

// Verifica que FRONTEND_URL esté definido en tu archivo .env
const frontendUrl = process.env.FRONTEND_URL as string;
if (!frontendUrl) {
  console.error('FRONTEND_URL no está definido en el archivo .env');
  process.exit(1);
}

// Configuración de CORS
app.use(
  cors({
    origin: frontendUrl, // URL del frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
    credentials: true, // Permitir cookies o autenticación
  }),
);

// Middleware para parsear JSON
app.use(express.json()); // Habilitar parsing de JSON

// Usar las rutas con el prefijo /api/v1
app.use('/api/v1', routes); // Registrar las rutas bajo el prefijo /api/v1

app.listen(port, () => {
  console.log(`CORS habilitado para ${frontendUrl}`);
  console.log(`Server is running on port ${port}`);
});

export default app;
