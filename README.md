# FoodRescue

Plataforma web que conecta locales de comida con excedentes o productos proximos a caducar con personas que desean comprarlos a precio reducido, ayudando a reducir el desperdicio de alimentos.

Proyecto full-stack desarrollado con el stack MERN (MongoDB, Express, React, Node.js) y autenticacion mediante JWT.

## Tabla de contenido

- [Descripcion](#descripcion)
- [Tecnologias](#tecnologias)
- [Funcionalidades](#funcionalidades)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Requisitos previos](#requisitos-previos)
- [Instalacion](#instalacion)
- [Variables de entorno](#variables-de-entorno)
- [Ejecucion](#ejecucion)
- [API REST](#api-rest)
- [Modelo de datos](#modelo-de-datos)
- [Evidencias](#evidencias)
- [Integrantes](#integrantes)

## Descripcion

FoodRescue maneja dos tipos de usuario:

- **Local**: publica ofertas (packs de comida) con su precio original, precio de rescate, cantidad disponible y horario de retiro. Administra sus ofertas y revisa las reservas recibidas.
- **Consumidor**: explora las ofertas disponibles, las filtra por categoria y precio, y las reserva. Al reservar obtiene un codigo de retiro para presentar en el local.

## Tecnologias

**Frontend**

- React 18
- Vite
- React Router
- Axios
- lucide-react (iconos)

**Backend**

- Node.js
- Express
- MongoDB con Mongoose
- JSON Web Token (JWT)
- bcryptjs
- express-validator

**Herramientas**

- Postman
- Git y GitHub
- Figma

## Funcionalidades

- Registro e inicio de sesion con JWT.
- Cierre de sesion y almacenamiento seguro del token.
- Proteccion de rutas privadas por sesion y por rol.
- CRUD completo de ofertas (crear, consultar, editar, eliminar).
- Filtros de ofertas por categoria y precio maximo.
- Reserva de ofertas con control de stock y generacion de codigo de retiro.
- Cancelacion de reservas (devuelve el stock a la oferta).
- Gestion de reservas recibidas por el local (marcar como entregada).
- Validaciones en el cliente y en el servidor.
- Manejo centralizado de errores.

## Estructura del proyecto

```
foodrescue/
├── backend/
│   ├── src/
│   │   ├── config/         Conexion a MongoDB
│   │   ├── models/         Modelos de Mongoose (User, Offer, Reservation)
│   │   ├── controllers/    Logica de cada recurso
│   │   ├── routes/         Definicion de rutas de la API
│   │   ├── middleware/     Autenticacion, validaciones y manejo de errores
│   │   └── server.js       Punto de entrada del servidor
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/            Instancia de axios con el token automatico
│   │   ├── components/     Componentes reutilizables
│   │   ├── context/        Contexto de autenticacion
│   │   ├── hooks/          Hooks reutilizables (useForm)
│   │   ├── pages/          Pantallas de la aplicacion
│   │   ├── services/       Funciones que consumen la API
│   │   ├── utils/          Constantes y utilidades de formato
│   │   ├── App.jsx         Configuracion de rutas
│   │   └── index.css       Sistema de diseno
│   ├── .env.example
│   └── package.json
├── FoodRescue.postman_collection.json
└── README.md
```

## Requisitos previos

- Node.js version 20 o superior
- MongoDB instalado y en ejecucion de forma local
- npm

## Instalacion

Clonar el repositorio:

```bash
git clone https://github.com/DullVillacis/CP2_DesarrolloWeb.git
cd CP2_DesarrolloWeb
```

Instalar dependencias del backend:

```bash
cd backend
npm install
```

Instalar dependencias del frontend:

```bash
cd ../frontend
npm install
```

## Variables de entorno

Cada parte del proyecto usa un archivo `.env`. Se incluye un `.env.example` como plantilla.

**backend/.env**

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/foodrescue
JWT_SECRET=escribe_aqui_una_clave_secreta_larga
JWT_EXPIRES_IN=7d
```

**frontend/.env**

```
VITE_API_URL=http://localhost:5000/api
```

## Ejecucion

El proyecto necesita dos terminales, una para el backend y otra para el frontend.

Terminal 1 (backend):

```bash
cd backend
npm run dev
```

El servidor queda disponible en `http://localhost:5000`.

Terminal 2 (frontend):

```bash
cd frontend
npm run dev
```

La aplicacion queda disponible en `http://localhost:5173`.

## API REST

Base: `http://localhost:5000/api`

### Autenticacion

| Metodo | Ruta             | Descripcion                      | Acceso    |
| ------ | ---------------- | -------------------------------- | --------- |
| POST   | /auth/register   | Registrar un usuario             | Publico   |
| POST   | /auth/login      | Iniciar sesion                   | Publico   |
| GET    | /auth/perfil     | Datos del usuario autenticado    | Con token |

### Ofertas

| Metodo | Ruta            | Descripcion                                | Acceso     |
| ------ | --------------- | ------------------------------------------ | ---------- |
| GET    | /offers         | Listar ofertas (filtros: categoria, precioMax, estado) | Con token |
| GET    | /offers/mias    | Ofertas del local autenticado              | Local      |
| GET    | /offers/:id     | Detalle de una oferta                      | Con token  |
| POST   | /offers         | Crear una oferta                           | Local      |
| PUT    | /offers/:id     | Editar una oferta propia                   | Local      |
| DELETE | /offers/:id     | Eliminar una oferta propia                 | Local      |

### Reservas

| Metodo | Ruta                        | Descripcion                        | Acceso     |
| ------ | --------------------------- | ---------------------------------- | ---------- |
| POST   | /reservations               | Crear una reserva                  | Consumidor |
| GET    | /reservations/mias          | Reservas del consumidor            | Consumidor |
| GET    | /reservations/local         | Reservas de las ofertas del local  | Local      |
| PUT    | /reservations/:id/completar | Marcar una reserva como entregada  | Local      |
| PUT    | /reservations/:id/cancelar  | Cancelar una reserva               | Consumidor |

Todas las peticiones a rutas protegidas deben incluir la cabecera:

```
Authorization: Bearer <token>
```

Las pruebas de la API se encuentran en el archivo `FoodRescue.postman_collection.json`, listo para importar en Postman.

## Modelo de datos

**users**

| Campo                            | Tipo   | Descripcion                          |
| -------------------------------- | ------ | ------------------------------------ |
| nombre                           | String | Nombre del usuario                   |
| email                            | String | Correo unico                         |
| password                         | String | Contrasena encriptada con bcrypt     |
| rol                              | String | local o consumidor                   |
| nombreNegocio, direccion, telefono | String | Datos solo para el rol local       |

**offers**

| Campo               | Tipo     | Descripcion                        |
| ------------------- | -------- | ---------------------------------- |
| titulo              | String   | Nombre del pack                    |
| descripcion         | String   | Detalle del pack                   |
| categoria           | String   | Categoria de la comida             |
| precioOriginal      | Number   | Precio normal                      |
| precioDescuento     | Number   | Precio de rescate                  |
| cantidadDisponible  | Number   | Stock                              |
| horarioRetiro       | String   | Horario para retirar               |
| disponibleHasta     | Date     | Fecha limite                       |
| estado              | String   | disponible o agotado               |
| local               | ObjectId | Referencia al usuario que la creo  |

**reservations**

| Campo         | Tipo     | Descripcion                            |
| ------------- | -------- | -------------------------------------- |
| oferta        | ObjectId | Referencia a la oferta                 |
| consumidor    | ObjectId | Referencia al usuario que reservo      |
| cantidad      | Number   | Cantidad reservada                     |
| codigoRetiro  | String   | Codigo para presentar en el local      |
| estado        | String   | pendiente, completada o cancelada      |

## Evidencias

- Repositorio: https://github.com/DullVillacis/CP2_DesarrolloWeb
- Coleccion de Postman: `FoodRescue.postman_collection.json`
- Base de datos: exportacion incluida en el repositorio
- Diseno en Figma: (agregar enlace)

## Integrantes

- Dulce Maria Villacis Pisco
- Jaione Eneritz Cherres Cevallos
- Ronny Isaac Arellano Urgiles
