/** Este módulo proporciona funciones para establecer conexión con la base de datos y ejecutar consultas SQL de manera segura. */

// Importamos la configuración de variables de entorno desde el archivo .env
import "dotenv/config";

// Importamos el módulo pg (node-postgres) y extraemos la clase Pool
import pkg from "pg";
const { Pool } = pkg;

/**
 * Instancia del pool de conexiones a PostgreSQL
 * Utiliza las variables de entorno para la configuración de la conexión:
 * - DB_USER: Usuario de la base de datos
 * - DB_HOST: Host donde se encuentra la base de datos
 * - DB_NAME: Nombre de la base de datos
 * - DB_PASSWORD: Contraseña del usuario
 * - DB_PORT: Puerto de conexión a PostgreSQL
 */
export const pool = new Pool({
  user: process.env.DB_USER, // Usuario de la base de datos definido en .env
  host: process.env.DB_HOST, // Host de la base de datos definido en .env
  database: process.env.DB_NAME, // Nombre de la base de datos definido en .env
  password: process.env.DB_PASSWORD, // Contraseña definida en .env
  port: process.env.DB_PORT, // Puerto definido en .env
});

/**
 * Establece una conexión inicial con la base de datos para verificar que
 * la configuración es correcta y que la base de datos está accesible.
 * @async
 * @returns {Promise<void>} No retorna valores, solo muestra mensajes en consola
 */
export const connectDB = async () => {
  try {
    // Obtenemos un cliente del pool de conexiones
    const client = await pool.connect();

    // Mostramos un mensaje de éxito en la consola
    console.log("Postgress conection established");

    // Liberamos el cliente para que vuelva al pool y pueda ser reutilizado
    client.release();
  } catch (error) {
    // En caso de error, mostramos el mensaje en la consola
    console.error("Error to conect to Postgress:", error);
  }
};

/** Ejecuta una consulta SQL en la base de datos y retorna el resultado */
export const query = async (text, params) => {
  try {
    // Ejecutamos la consulta SQL utilizando el pool de conexiones
    // text: consulta SQL (ej: "SELECT * FROM users WHERE id = $1")
    // params: arreglo de valores para los parámetros (ej: [1])
    const result = await pool.query(text, params);

    // Retornamos el resultado de la consulta
    return result;
  } catch (error) {
    // Registramos el error en la consola
    console.error("Error to ejecute query:", error);

    // Propagamos el error para que sea manejado por la función que llamó a query
    throw error;
  }
};
