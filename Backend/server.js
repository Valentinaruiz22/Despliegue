/* eslint-disable no-undef */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import tareasRouter from './routes/tareas.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sincronizar base de datos
sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Base de datos sincronizada');
  })
  .catch((err) => {
    console.error('❌ Error al sincronizar la base de datos:', err);
  });

// Rutas
app.use('/api/tareas', tareasRouter);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend funcionando correctamente' });
});

// Manejo de errores
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
