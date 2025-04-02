// Importa el framework Express, que es la base para crear la aplicación web. Express facilita la creación de servidores HTTP y el manejo de rutas, middleware, etc.
import express from "express";

// Importa las rutas definidas para los tipos de usuario. Este módulo contiene todas las rutas relacionadas con operaciones CRUD para tipos de usuario
import user_TypesRoutes from "./routes/user_type.routes.js";

// Importa las rutas definidas para los usuarios. Este módulo contiene todas las rutas relacionadas con operaciones CRUD para usuarios
import userRoutes from "./routes/user.routes.js";

// Importa dotenv, una biblioteca para cargar variables de entorno desde un archivo .env. Esto permite mantener configuraciones sensibles fuera del código
import dotenv from "dotenv";

// Importa cors, un middleware que habilita las solicitudes de origen cruzado (Cross-Origin Resource Sharing). Permite que el frontend acceda a la API desde un dominio diferente
import cors from "cors";

// Configura dotenv para cargar variables de entorno del archivo .env
dotenv.config();

// Crea una nueva instancia de la aplicación Express
const app = express();

// Este middleware analiza las solicitudes entrantes con cuerpos JSON. Permite acceder a los datos enviados en formato JSON a través de req.body
app.use(express.json());

// Habilita CORS para todas las rutas. Por defecto, permite solicitudes desde cualquier origen. Se puede configurar para restringir orígenes, métodos HTTP, encabezados, etc.
app.use(cors());

// Agrega las rutas de tipos de usuario a la aplicación. Todas las rutas definidas en userTypesRoutes ahora son parte de la aplicación. Nota: Aquí no se define un prefijo, por lo que se usarán las rutas exactas definidas en el módulo
app.use(user_TypesRoutes);

// Agrega las rutas de usuarios a la aplicación. Todas las rutas definidas en userRoutes ahora son parte de la aplicación. Nota: Aquí no se define un prefijo, por lo que se usarán las rutas exactas definidas en el módulo
app.use(userRoutes);

// === MANEJADOR DE ERRORES GLOBAL ===

// Configura un middleware para manejar errores en toda la aplicación. Este middleware se ejecuta cuando se pasa un error a la función next() en cualquier ruta o middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Envía una respuesta de error genérica al cliente con código de estado 500 (Error Interno del Servidor)
  res.status(500).send("Something went wrong!");
});

// Exporta la aplicación Express configurada. Esto permite importar la aplicación en otros archivos, por ejemplo, para iniciarla en server.js
export default app;
