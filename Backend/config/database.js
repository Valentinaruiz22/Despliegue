/* eslint-disable no-undef */
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Para Railway, usa DATABASE_URL o la cadena de conexión completa
const sequelize = new Sequelize(
  process.env.DATABASE_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  {
    dialect: 'postgres',
    logging: false, // Cambia a console.log si quieres ver las queries SQL
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

// Probar conexión
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conexión a la base de datos exitosa');
  })
  .catch((err) => {
    console.error('❌ Error al conectar a la base de datos:', err);
  });

export default sequelize;
