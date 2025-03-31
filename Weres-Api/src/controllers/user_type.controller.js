/* Este módulo contiene los controladores para manejar las peticiones HTTP relacionadas con la entidad tipo de usuario (user_type). Cada función
se encarga de procesar una solicitud específica, invocar la lógica de negocio correspondiente y devolver una respuesta HTTP apropiada. */

// Importamos las funciones de lógica de negocio para tipos de usuario
import {
  createUserType,
  deleteUserType,
  getAllUserTypes,
  getOneUserType,
  updateUserType,
} from "../business/user_type.business.js";

// Importamos constantes para códigos de estado HTTP estandarizados
import { StatusCodes } from "http-status-codes";

/* Obtiene todos los tipos de usuario*/
export const getUserTypes = async (req, res) => {
  // Llamamos al servicio de negocio para obtener todos los tipos de usuario
  const getAll = await getAllUserTypes();

  // Verificamos si el resultado es una instancia de Error
  if (getAll instanceof Error) {
    // Retornamos un código de estado 400 (Bad Request) con el mensaje de error
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: getAll.message });
  }

  // Si no hay errores, retornamos los datos con un estado 200 (OK) implícito
  res.json(getAll);
};

/* Crea un nuevo tipo de usuario */
export const createUserTypes = async (req, res) => {
  // Llamamos al servicio de negocio para crear un tipo de usuario con los datos del cuerpo de la petición
  const create = await createUserType(req.body);

  // Verificamos si el resultado es una instancia de Error
  if (create instanceof Error) {
    // Diferenciamos el tipo de error para enviar el código de estado apropiado
    if (create.message.startsWith("Name cannot be empty")) {
      // Error de validación: retornamos 400 (Bad Request) con el mensaje específico
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: create.message });
    } else {
      // Error interno: retornamos 500 (Internal Server Error) con un mensaje genérico
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "internal server error" });
    }
  }

  // Si no hay errores, retornamos los datos con un estado 201 (Created)
  res.status(StatusCodes.CREATED).json(create);
};

/* Actualiza un tipo de usuario existente */
export const updateUserTypes = async (req, res) => {
  // Extraemos los datos del cuerpo y los parámetros de la petición
  const updateBody = req.body; // Contiene los nuevos valores (por ejemplo, el nombre)
  const updateParams = req.params; // Contiene el ID del tipo de usuario a actualizar

  // Llamamos al servicio de negocio para actualizar el tipo de usuario
  const update = await updateUserType(updateParams, updateBody);

  // Verificamos si el resultado es una instancia de Error
  if (update instanceof Error) {
    // Diferenciamos el tipo de error para enviar el código de estado apropiado
    if (update.message.startsWith("Must indicate a valid registration")) {
      // Error de recurso no encontrado: retornamos 400 (Bad Request) con el mensaje específico
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: update.message });
    } else {
      // Error interno: retornamos 500 (Internal Server Error) con un mensaje genérico
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "internal server error" });
    }
  }

  // Si no hay errores, retornamos los datos actualizados con un estado 200 (OK) implícito
  res.json(update);
};

/* Elimina un tipo de usuario por su ID */
export const deletedUserType = async (req, res) => {
  // Llamamos al servicio de negocio para eliminar el tipo de usuario usando el ID de los parámetros
  const deleteUserTypeById = await deleteUserType(req.params);

  // Verificamos si el resultado es una instancia de Error
  if (deleteUserTypeById instanceof Error) {
    // Diferenciamos el tipo de error para enviar el código de estado apropiado
    if (
      deleteUserTypeById.message.startsWith(
        "Must indicate a valid registration"
      )
    ) {
      // Error de recurso no encontrado: retornamos 400 (Bad Request) con el mensaje específico
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: deleteUserTypeById.message });
    } else {
      // Error interno: retornamos 500 (Internal Server Error) con un mensaje genérico
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "internal server error" });
    }
  }

  // Si no hay errores, retornamos los datos del registro eliminado con un estado 200 (OK) implícito
  res.json(deleteUserTypeById);
};

/* Obtiene un tipo de usuario específico por su ID*/
export const getOne = async (req, res) => {
  // Extraemos el ID de los parámetros de la petición
  const id = req.params;

  // Llamamos al servicio de negocio para obtener el tipo de usuario específico
  const userTypeById = await getOneUserType(id);

  // Verificamos si el resultado es una instancia de Error
  if (userTypeById instanceof Error) {
    // Diferenciamos el tipo de error para enviar el código de estado apropiado
    if (userTypeById.message.startsWith("Must indicate a valid registration")) {
      // Error de recurso no encontrado: retornamos 400 (Bad Request) con el mensaje específico
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: userTypeById.message });
    } else {
      // Error interno: retornamos 500 (Internal Server Error) con un mensaje genérico
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "internal server error" });
    }
  }

  // Si no hay errores, retornamos los datos del tipo de usuario con un estado 200 (OK) implícito
  res.json(userTypeById);
};
