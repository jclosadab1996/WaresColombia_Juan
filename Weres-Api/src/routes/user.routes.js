import { Router } from "express";
import {
  createUserController,
  createUserRegisterController,
  deletedUserController,
  getOneController,
  updateUserController,
  getUsersWithPagination,
} from "../controllers/user.controller.js";

const router = Router();

/**
 * Obtiene todos los usuarios con paginación y capacidades de búsqueda. Ejemplo de solicitud:
 * GET /users?page=1&limit=10&search=john
 */
router.get("/users", getUsersWithPagination);

/**
 * Crea un nuevo usuario (solo para administradores)
 * Ejemplo de cuerpo de solicitud:
 * {
 *   "name": "John Doe",
 *   "email": "john@example.com",
 *   "password": "securepassword",
 *   "role": "operator"
 * }
 */
router.post("/users", createUserController);

/**
 * Registra un nuevo usuario (para operarios)
 * // Ejemplo de cuerpo de solicitud:
 * {
 *   "name": "Jane Smith",
 *   "email": "jane@example.com",
 *   "password": "mypassword"
 * }
 */
router.post("/users/register", createUserRegisterController);

/**
 * Actualiza un usuario existente por ID
 * // Ejemplo de cuerpo de solicitud:
 * {
 *   "name": "John Updated",
 *   "email": "updated@example.com"
 * }
 */
router.put("/users/:id", updateUserController);

/**
 * Elimina un usuario por ID
 * // Ejemplo de respuesta exitosa:
 * {
 *   "message": "Usuario eliminado correctamente"
 * }
 */
router.delete("/users/:id", deletedUserController);

/** Obtiene un usuario específico por ID */
router.get("/users/:id", getOneController);

export default router;
