import Tarea from '../models/Tarea.js';

// Obtener todas las tareas
export const obtenerTareas = async (req, res) => {
  try {
    const tareas = await Tarea.findAll();
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear una nueva tarea
export const crearTarea = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'El texto de la tarea es requerido' });
    }
    const tarea = await Tarea.create({ text, completed: false });
    res.status(201).json(tarea);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una tarea
export const actualizarTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, completed } = req.body;
    const tarea = await Tarea.findByPk(id);
    
    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    
    if (text) tarea.text = text;
    if (completed !== undefined) tarea.completed = completed;
    
    await tarea.save();
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una tarea
export const eliminarTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const tarea = await Tarea.findByPk(id);
    
    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    
    await tarea.destroy();
    res.json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
