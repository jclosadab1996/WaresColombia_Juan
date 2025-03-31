// Importa el constructor Router del paquete Express
// Este objeto Router permite definir rutas de manera modular
import { Router } from "express";

// Importa los controladores para operaciones CRUD de tipos de usuario
import {
  getUserTypes,
  createUserTypes,
  deletedUserType,
  updateUserTypes,
  getOne,
} from "../controllers/user_type.controller.js";

// Crea una nueva instancia del enrutador de Express
// Este router manejará todas las rutas relacionadas con los tipos de usuario
const router = Router();

// Define una ruta GET para obtener todos los tipos de usuario cuando se hace una petición GET a "/user-types", se ejecuta el controlador getUserTypesEste controlador normalmente consultará la base de datos y devolverá una lista de todos los tipos de usuario
router.get("/user-types", getUserTypes);

// Define una ruta POST para crear un nuevo tipo de usuarioCuando se hace una petición POST a "/user-types" con los datos en el cuerpo de la solicitud, se ejecuta el controlador createUserTypes que procesará los datos y creará un nuevo registro
router.post("/user-types", createUserTypes);

// Define una ruta PUT para actualizar un tipo de usuario específico
router.put("/user-types/:id", updateUserTypes);

// Define una ruta DELETE para eliminar un tipo de usuario específico
router.delete("/user-types/:id", deletedUserType);

// Define una ruta GET para obtener un tipo de usuario específico por su ID
router.get("/user-types/:id", getOne);

// Exporta el enrutador configurado como exportación predeterminada del módulo
export default router;
