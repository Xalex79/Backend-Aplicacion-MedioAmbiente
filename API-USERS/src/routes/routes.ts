import { Router } from "express";
import { MedicionRepository } from "@repositories/medicionRepositories";
import { MedicionService } from "@services/medicionService";
import { IMedicionRepository, IMedicionService, Medicion } from "types/MedicionesTypes";

/**
* @brief Define las rutas de la API para el manejo de datos de medición.
* @author Alejandro Rosado
*/
const router = Router();

// Inicialización de repositorios y servicios
const medicionRepositories: IMedicionRepository = new MedicionRepository();
const medicionService: IMedicionService = new MedicionService(medicionRepositories);

// Ruta de salud
router.get("/health", (req, res) => {
  res.send("Api is Healthy!!!");
});

// Obtener todas las mediciones
router.get("/mediciones", async (req, res) => {
  const medicion = await medicionService.findMediciones();
  res.json(medicion);
});

// Obtener medición por ID
router.get("/mediciones/:id", async (req, res) => {
  const mediciones = await medicionService.findMedicionesById(req.params.id);
  res.json(mediciones);
});

// Crear nueva medición
router.post("/mediciones", async (req, res) => {
  const newMedicion: Medicion = req.body;
  const result = await medicionService.createMedicion(newMedicion);
  res.json(result);
});

// Actualizar medición por ID
router.put("/mediciones/:id", async (req, res) => {
  const mediciones = await medicionService.updateMedicion(req.params.id, req.body);
  res.json(mediciones);
});

// Eliminar medición por ID
router.delete("/mediciones/:id", async (req, res) => {
  const mediciones = await medicionService.deleteMedicion(req.params.id);
  res.json(mediciones);
});

export default router;
