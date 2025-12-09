import express from 'express';
import {
  obtenerTareas,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
} from '../controllers/tareasController.js';

const router = express.Router();

// GET - Obtener todas las tareas
router.get('/', obtenerTareas);

// POST - Crear una nueva tarea
router.post('/', crearTarea);

// PUT - Actualizar una tarea
router.put('/:id', actualizarTarea);

// DELETE - Eliminar una tarea
router.delete('/:id', eliminarTarea);

export default router;
