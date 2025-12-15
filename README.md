# 📝 TODO List App

Una aplicación web full-stack para gestionar tareas pendientes. Permite crear, actualizar, eliminar y marcar tareas como completadas con una interfaz moderna y responsiva.

## 🚀 Características

✅ **Crear tareas** - Agrega nuevas tareas a tu lista  
✅ **Marcar completadas** - Checkea tareas finalizadas  
✅ **Eliminar tareas** - Remueve tareas que ya no necesites  
✅ **Interfaz moderna** - Diseño limpio y responsivo  
✅ **Persistencia de datos** - Los datos se guardan en base de datos

---

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** - Runtime JavaScript para el servidor
- **Express.js** - Framework web minimalista
- **PostgreSQL** - Base de datos relacional
- **Sequelize** - ORM para Node.js
- **CORS** - Middleware para comunicación cross-origin
- **dotenv** - Variables de entorno
- **Nodemon** - Desarrollo automático (reinicia servidor en cambios)

### Frontend
- **React** - Librería para interfaces de usuario
- **Vite** - Bundler y dev server rápido
- **Tailwind CSS** - Framework CSS utility-first
- **Heroicons** - Librería de iconos SVG
- **Fetch API** - Para comunicarse con el backend

---

## 📁 Estructura del Proyecto

```
Despliegue/
│
├── Backend/                          # API REST
│   ├── config/
│   │   └── database.js              # Configuración de conexión a PostgreSQL
│   ├── controllers/
│   │   └── tareasController.js      # Lógica de negocio (CRUD)
│   ├── models/
│   │   └── Tarea.js                 # Modelo de datos con Sequelize
│   ├── routes/
│   │   └── tareas.js                # Endpoints de la API
│   ├── server.js                    # Punto de entrada principal
│   ├── package.json                 # Dependencias y scripts
│   ├── Procfile                     # Configuración para Heroku/Render
│   └── .env                         # Variables de entorno (no versionado)
│
├── Frontend/                         # Interfaz de usuario
│   ├── src/
│   │   ├── main.jsx                 # Punto de entrada React
│   │   └── assets/                  # Imágenes y recursos
│   ├── App.jsx                      # Componente principal
│   ├── TodoItem.jsx                 # Componente de item individual
│   ├── App.css                      # Estilos específicos
│   ├── index.css                    # Estilos globales
│   ├── index.html                   # HTML principal
│   ├── package.json                 # Dependencias y scripts
│   ├── vite.config.js               # Configuración de Vite
│   ├── tailwind.config.js           # Configuración de Tailwind
│   ├── postcss.config.js            # Configuración de PostCSS
│   ├── vercel.json                  # Configuración para despliegue en Vercel
│   └── .env                         # Variables de entorno (no versionado)
│
└── README.md                        # Este archivo
```

---

## 📊 Explicación de Archivos Principales

### Backend

#### `server.js`
Punto de entrada del servidor Express. Configura:
- Middleware (CORS, JSON parser)
- Sincronización de base de datos
- Rutas principales
- Manejo de errores
- Puerto de escucha

#### `config/database.js`
Configura la conexión a PostgreSQL usando Sequelize:
- Credenciales de conexión
- Pool de conexiones
- Validación de conexión

#### `models/Tarea.js`
Define el modelo de datos:
- `id`: Identificador único (autoincremento)
- `text`: Descripción de la tarea
- `completed`: Estado (completada o no)
- `createdAt` / `updatedAt`: Timestamps automáticos

#### `controllers/tareasController.js`
Contiene la lógica de negocio:
- `obtenerTareas()` - GET todos las tareas
- `crearTarea()` - POST nueva tarea
- `actualizarTarea()` - PUT para modificar tarea
- `eliminarTarea()` - DELETE para remover tarea

#### `routes/tareas.js`
Define los endpoints de la API:
- `GET /api/tareas` - Obtener todas
- `POST /api/tareas` - Crear nueva
- `PUT /api/tareas/:id` - Actualizar
- `DELETE /api/tareas/:id` - Eliminar

### Frontend

#### `App.jsx`
Componente raíz principal:
- Gestiona estado global de tareas (useState)
- Carga tareas al montar (useEffect)
- Funciones: cargarTareas, agregarTarea, toggleCompleted, eliminarTarea
- Interfaz con input y botón
- Renderiza lista de tareas

#### `TodoItem.jsx`
Componente para cada tarea individual:
- Muestra el texto de la tarea
- Checkbox para marcar completada
- Botón de eliminar con ícono
- Estilos condicionales (tachado si completada)

#### Configuración
- `vite.config.js` - Configuración de Vite
- `tailwind.config.js` - Tema y estilos de Tailwind
- `postcss.config.js` - Procesamiento de CSS

---

## 🔄 Flujo de Datos

```
Frontend                        Backend                    Database
   │                               │                          │
   ├─ GET /api/tareas ────────────>│                          │
   │                               ├─ Query ────────────────>│
   │                               │<─ Resultados ──────────┤
   │<─ JSON Array ─────────────────┤                          │
   │                               │                          │
   ├─ POST /api/tareas ───────────>│                          │
   │   (new tarea)                 ├─ INSERT ──────────────>│
   │                               │<─ Nueva tarea ────────┤
   │<─ Created tarea ──────────────┤                          │
   │                               │                          │
   ├─ PUT /api/tareas/:id ────────>│                          │
   │   (completed)                 ├─ UPDATE ──────────────>│
   │                               │<─ Tarea actualizada ──┤
   │<─ Updated tarea ──────────────┤                          │
   │                               │                          │
   ├─ DELETE /api/tareas/:id ─────>│                          │
   │                               ├─ DELETE ──────────────>│
   │<─ Success message ────────────┤                          │
```

---

## 🚦 Cómo Ejecutar Localmente

### Requisitos Previos
- Node.js (v14 o superior)
- PostgreSQL instalado y corriendo
- npm o yarn

### Instalación Backend

```bash
cd Backend
npm install
```

Crea un archivo `.env` en la carpeta Backend:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=todo_list
DB_USER=postgres
DB_PASSWORD=tu_contraseña
PORT=5000
```

Inicia el servidor:
```bash
npm run dev
```

### Instalación Frontend

```bash
cd Frontend
npm install
```

Crea un archivo `.env` en la carpeta Frontend:
```
VITE_API_URL=http://localhost:5000/api/tareas
```

Inicia el desarrollo:
```bash
npm run dev
```

Abre `http://localhost:5173` en tu navegador

---

## 📡 Endpoints de la API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/tareas` | Obtiene todas las tareas |
| `POST` | `/api/tareas` | Crea una nueva tarea |
| `PUT` | `/api/tareas/:id` | Actualiza una tarea |
| `DELETE` | `/api/tareas/:id` | Elimina una tarea |
| `GET` | `/api/health` | Verifica si el servidor funciona |

### Ejemplos de Requests

**GET - Obtener todas las tareas:**
```bash
curl http://localhost:5000/api/tareas
```

**POST - Crear tarea:**
```bash
curl -X POST http://localhost:5000/api/tareas \
  -H "Content-Type: application/json" \
  -d '{"text":"Mi nueva tarea"}'
```

**PUT - Actualizar tarea:**
```bash
curl -X PUT http://localhost:5000/api/tareas/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

**DELETE - Eliminar tarea:**
```bash
curl -X DELETE http://localhost:5000/api/tareas/1
```

---

## 🌐 Despliegue

### Backend (Render.com)
1. Conecta tu repositorio a Render
2. Configura variables de entorno (DATABASE_URL, etc.)
3. Render ejecuta automáticamente con Procfile
4. La API estará disponible en: `https://despliegue-backend-qe21.onrender.com`

### Frontend (Vercel)
1. Conecta tu repositorio a Vercel
2. Configura variable de entorno: `VITE_API_URL`
3. Vercel detecta Vite automáticamente
4. Tu app estará disponible en una URL de Vercel

---

## 🔒 Variables de Entorno

### Backend (.env)
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=todo_list
DB_USER=postgres
DB_PASSWORD=contraseña
NODE_ENV=development
PORT=5000
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api/tareas
```

---

## 🐛 Troubleshooting

**Error: CORS blocked**
- Verifica que CORS esté habilitado en backend
- Comprueba que VITE_API_URL sea correcto

**Error: Database connection failed**
- Verifica que PostgreSQL esté corriendo
- Comprueba credenciales en .env
- Asegúrate de que la base de datos existe

**Error: Cannot find module**
- Ejecuta `npm install` en Backend y Frontend
- Verifica que las dependencias estén en package.json

---

## 📚 Scripts Disponibles

### Backend
```bash
npm run dev    # Inicia servidor con nodemon (desarrollo)
npm start      # Inicia servidor en producción
```

### Frontend
```bash
npm run dev    # Inicia servidor de desarrollo Vite
npm run build  # Genera build de producción
npm run preview # Vista previa del build
```

---

## 👨‍💻 Autor

Proyecto creado como aplicación de demostración full-stack.

---

## 📝 Licencia

Este proyecto está disponible bajo la licencia MIT.

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios mayores, abre un issue primero para discutir los cambios propuestos.

