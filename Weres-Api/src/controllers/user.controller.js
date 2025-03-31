// Importación de módulos y dependencias
import { StatusCodes } from "http-status-codes"; // Importa códigos de estado HTTP estandarizados
import {
  createUser,
  deleteUser,
  getAllUsers,
  getOne,
  updateUser,
} from "../business/user.business.js"; // Importa funciones de la capa de negocio para operaciones CRUD
import { validationResult } from "express-validator"; // Importa utilidad para validar resultados de las validaciones
import {
  createUserValidatorSchema,
  updateUserValidatorSchema,
} from "../validators/user.validator.js"; // Importa esquemas de validación para usuarios
import { body, param, query } from "express-validator"; // Importa funciones para validar cuerpo, parámetros y consultas de las peticiones

/**
 * Controlador para crear un nuevo usuario
 * Contiene validaciones de datos y la lógica para procesar la creación
 */
export const createUserController = [
  // Validaciones de los campos del formulario
  body(createUserValidatorSchema.type_document_id.in)
    .isInt()
    .notEmpty()
    .exists()
    .withMessage(createUserValidatorSchema.type_document_id.errorMessage), // Valida que el tipo de documento sea un entero, no vacío y exista
  body(createUserValidatorSchema.user_type_id.in)
    .isInt()
    .notEmpty()
    .exists()
    .withMessage(createUserValidatorSchema.user_type_id.errorMessage), // Valida que el tipo de usuario sea un entero, no vacío y exista
  body(createUserValidatorSchema.email.in)
    .isEmail()
    .exists()
    .withMessage(createUserValidatorSchema.email.errorMessage), // Valida que el email tenga formato correcto y exista
  body(createUserValidatorSchema.name.in)
    .isString()
    .exists()
    .withMessage(createUserValidatorSchema.name.errorMessage), // Valida que el nombre sea una cadena de texto y exista
  body(createUserValidatorSchema.document_number.in)
    .isString()
    .exists()
    .withMessage(createUserValidatorSchema.document_number.errorMessage), // Valida que el número de documento sea una cadena de texto y exista

  // Función del controlador que se ejecuta después de las validaciones
  async (req, res) => {
    // Verifica si hay errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Si hay errores, retorna un estado 400 con los errores encontrados
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    // Intenta crear el usuario llamando a la función de negocio
    const newUser = await createUser(req.body);
    // Verifica si hubo un error en la creación
    if (newUser instanceof Error) {
      // Maneja diferentes tipos de errores
      if (
        newUser.message.startsWith("You must indicate a Valid User Type") ||
        newUser.message.startsWith("Email already registered")
      ) {
        // Si el error es de validación de negocio, retorna 400
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: newUser.message });
      } else {
        // Si es un error interno, retorna 500
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "internal server error" });
      }
    }

    // Si todo salió bien, retorna el usuario creado con estado 201
    return res.status(StatusCodes.CREATED).json({
      description: "User has been created correctly",
      data: newUser,
    });
  },
];

/**
 * Alias para createUserController, utilizado posiblemente para el registro de usuarios
 */
export const createUserRegisterController = async (req, res) => {
  // Redirige al controlador principal de creación
  return createUserController(req, res);
};

/**
 * Controlador para obtener todos los usuarios
 */
export const getUsers = async (req, res) => {
  try {
    // Intenta obtener todos los usuarios pasando los parámetros de la consulta
    const users = await getAllUsers(req.query);
    // Retorna los usuarios con estado 200
    return res.status(StatusCodes.OK).json(users);
  } catch (error) {
    // Si hay un error, retorna estado 500 con el mensaje de error
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

/**
 * Controlador para obtener usuarios con paginación y búsqueda
 */
export const getUsersWithPagination = [
  // Validaciones de los parámetros de consulta para paginación
  query("limit").isInt().optional().withMessage("Limit must be an integer."), // Valida que limit sea un entero opcional
  query("page").isInt().optional().withMessage("Page must be an integer."), // Valida que page sea un entero opcional
  query("search_term")
    .optional()
    .isString()
    .withMessage("search_term must be a text string."), // Valida que search_term sea una cadena opcional

  // Función del controlador que se ejecuta después de las validaciones
  async (req, res) => {
    // Verifica si hay errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Si hay errores, retorna un estado 400 con los errores encontrados
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    // Extrae y establece valores por defecto para los parámetros de paginación
    let { limit = 20, page = 1, search_term = null } = req.query;
    // Calcula el offset para la paginación
    let offset = (page - 1) * limit;

    // Obtiene los usuarios con los parámetros de paginación
    const users = await getAllUsers({ limit, offset, search_term });
    // Retorna los usuarios con estado 200
    return res.status(StatusCodes.OK).json(users);
  },
];

/**
 * Controlador para actualizar un usuario existente
 */
export const updateUserController = [
  // Validaciones de los parámetros y campos para la actualización
  param(updateUserValidatorSchema.id.in)
    .isInt()
    .notEmpty()
    .exists()
    .withMessage(updateUserValidatorSchema.id.errorMessage), // Valida que el ID sea un entero, no vacío y exista
  body(updateUserValidatorSchema.type_document_id.in)
    .isInt()
    .notEmpty()
    .exists()
    .withMessage(updateUserValidatorSchema.type_document_id.errorMessage), // Valida tipo de documento
  body(updateUserValidatorSchema.user_type_id.in)
    .isInt()
    .notEmpty()
    .exists()
    .withMessage(updateUserValidatorSchema.user_type_id.errorMessage), // Valida tipo de usuario
  body(updateUserValidatorSchema.email.in)
    .isEmail()
    .exists()
    .withMessage(updateUserValidatorSchema.email.errorMessage), // Valida email
  body(updateUserValidatorSchema.name.in)
    .isString()
    .exists()
    .withMessage(updateUserValidatorSchema.name.errorMessage), // Valida nombre
  body(updateUserValidatorSchema.document_number.in)
    .isString()
    .exists()
    .withMessage(updateUserValidatorSchema.document_number.errorMessage), // Valida número de documento

  // Función del controlador que se ejecuta después de las validaciones
  async (req, res) => {
    // Verifica si hay errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Si hay errores, retorna un estado 400 con los errores encontrados
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    // Extrae los parámetros y el cuerpo de la solicitud
    const params = req.params;
    const body = req.body;

    // Intenta actualizar el usuario
    const updatedUser = await updateUser(params, body);
    // Verifica si hubo un error en la actualización
    if (updatedUser instanceof Error) {
      // Maneja diferentes tipos de errores
      if (
        updatedUser.message.startsWith("You must indicate a Valid User Type") ||
        updatedUser.message.startsWith("You must indicate a valid registration")
      ) {
        // Si el error es de validación de negocio, retorna 400
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: updatedUser.message });
      } else {
        // Si es otro tipo de error, retorna 500
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: updatedUser.message });
      }
    }

    // Si todo salió bien, retorna el usuario actualizado con estado 202
    return res.status(StatusCodes.ACCEPTED).json({
      description: "User has been updated correctly",
      data: updatedUser,
    });
  },
];

/**
 * Controlador para eliminar un usuario existente
 */
export const deletedUserController = async (req, res) => {
  // Intenta eliminar el usuario usando los parámetros de la URL
  const deletedUser = await deleteUser(req.params);
  // Verifica si hubo un error en la eliminación
  if (deletedUser instanceof Error) {
    // Maneja diferentes tipos de errores
    if (deletedUser.message.startsWith("Must indicate a valid registration")) {
      // Si el error es de validación, retorna 400
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: deletedUser.message });
    } else {
      // Si es un error interno, retorna 500
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "internal server error" });
    }
  }
  // Si todo salió bien, retorna el resultado de la eliminación (implícitamente estado 200)
  res.json(deletedUser);
};

/**
 * Controlador para obtener un usuario por su ID
 */
export const getOneController = async (req, res) => {
  // Extrae el ID de los parámetros de la URL
  const id = req.params;
  // Intenta obtener el usuario por su ID
  const userById = await getOne(id);
  // Verifica si hubo un error al obtener el usuario
  if (userById instanceof Error) {
    // Maneja diferentes tipos de errores
    if (userById.message.startsWith("Must indicate a valid registration")) {
      // Si el error es de validación, retorna 400
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: userById.message });
    } else {
      // Si es un error interno, retorna 500
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "internal server error" });
    }
  }
  // Si todo salió bien, retorna el usuario encontrado (implícitamente estado 200)
  res.json(userById);
};
