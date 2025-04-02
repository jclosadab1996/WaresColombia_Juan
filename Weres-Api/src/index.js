/** Este archivo es el punto de entrada principal de la aplicación.Se encarga de inicializar la conexión a la base de datos y arrancar el servidor web.*/

// Importa la instancia configurada de Express desde el archivo app.js
import app from "./app.js";
// Importa la función de conexión a la base de datos desde el módulo database.js
import { connectDB } from "./database/database.js";

/** Función principal asíncrona que inicializa la aplicación. Establece la conexión a la base de datos y arranca el servidor HTTP. */
async function main() {
  try {
    // Intenta establecer conexión con la base de datos
    // Esta operación es asíncrona, por lo que se utiliza await para esperar a que se complete
    await connectDB();

    // Si la conexión es exitosa, registra un mensaje de éxito en la consola
    console.log("Connection to the database successfully established.");

    // Inicia el servidor HTTP en el puerto 3000
    // El método listen retorna un servidor HTTP que comienza a aceptar conexiones
    app.listen(3000, () => {
      // Este callback se ejecuta cuando el servidor ha iniciado correctamente
      // Registra un mensaje en la consola indicando que el servidor está funcionando
      console.log("Server listening on port 3000");
    });
  } catch (error) {
    // Si ocurre algún error durante la conexión a la base de datos,
    // se captura en este bloque catch
    // Registra el error en la consola para facilitar la depuración
    console.error("Error connecting to the database:", error);
    // La aplicación terminará aquí si hay un error de conexión,
    // ya que no se inicia el servidor HTTP cuando falla la conexión a la BD
  }
}

// Invoca la función principal para iniciar la aplicación
// Este es el punto de inicio real de la ejecución
main();
