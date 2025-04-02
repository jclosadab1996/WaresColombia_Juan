/* Este módulo proporciona funciones para crear, listar, actualizar, eliminar y obtener tipos de usuario desde la base de datos. Los tipos de usuario permiten categorizar
a los usuarios del sistema según sus roles y permisos. */

import { query } from "../database/database.js"; // Importamos la función de consulta a la base de datos

/* Crea un nuevo tipo de usuario en el sistema*/
export const createUserType = async (params) => {
  try {
    // Extraemos el nombre del tipo de usuario del objeto params
    const { name } = params;

    // Validamos que el nombre no esté vacío
    if (!name) {
      throw new Error("Name cannot be empty");
    }

    // Insertamos el nuevo tipo de usuario en la base de datos y retornamos su información
    const result = await query(
      "INSERT INTO user_type (name) VALUES ($1) RETURNING *",
      [name]
    );

    // Retornamos el objeto del tipo de usuario creado
    return result.rows[0];
  } catch (error) {
    // Si ocurre algún error, lo retornamos para ser manejado por el controlador
    return error;
  }
};

/**
 * Obtiene todos los tipos de usuario registrados en el sistema
 * @async
 * @returns {Object} Objeto con mensaje de éxito y arreglo de tipos de usuario,
 *                   o error en caso de fallo
 */
export const getAllUserTypes = async () => {
  try {
    // Consultamos todos los tipos de usuario de la base de datos
    const result = await query("SELECT * FROM user_type");

    // Retornamos un objeto con mensaje de éxito y los datos obtenidos
    return {
      successfull: "suser types have been correctly listed",
      data: result.rows,
    };
  } catch (error) {
    // Si ocurre algún error, lo retornamos para ser manejado por el controlador
    return error;
  }
};

/* Actualiza la información de un tipo de usuario existente */
export const updateUserType = async (params, body) => {
  try {
    // Extraemos el ID del tipo de usuario a actualizar
    const { id } = params;

    // Extraemos el nuevo nombre del cuerpo de la solicitud
    const { name } = body;

    // Actualizamos el nombre del tipo de usuario en la base de datos
    const result = await query(
      "UPDATE user_type SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    );

    // Verificamos si se actualizó algún registro
    if (result.rows.length === 0) {
      throw new Error("Must indicate a valid registration");
    }

    // Retornamos el objeto del tipo de usuario actualizado
    return result.rows[0];
  } catch (error) {
    // Si ocurre algún error, lo retornamos para ser manejado por el controlador
    return error;
  }
};

/* Elimina un tipo de usuario del sistema */
export const deleteUserType = async (params) => {
  try {
    // Extraemos el ID del tipo de usuario a eliminar
    const { id } = params;

    // Eliminamos el tipo de usuario de la base de datos
    const result = await query(
      "DELETE FROM user_type WHERE id = $1 RETURNING *",
      [id]
    );

    // Verificamos si se eliminó algún registro
    if (result.rows.length === 0) {
      throw new Error("Must indicate a valid registration");
    }

    // Retornamos el objeto del tipo de usuario eliminado
    return result.rows[0];
  } catch (error) {
    // Si ocurre algún error, lo retornamos para ser manejado por el controlador
    return error;
  }
};

/* Obtiene la información de un tipo de usuario específico */
export const getOneUserType = async (params) => {
  try {
    // Extraemos el ID del tipo de usuario a consultar
    const { id } = params;

    // Consultamos el tipo de usuario en la base de datos
    const result = await query("SELECT * FROM user_type WHERE id = $1", [id]);

    // Verificamos si se encontró el tipo de usuario
    if (result.rows.length === 0) {
      throw new Error("Must indicate a valid registration");
    }

    // Retornamos el objeto del tipo de usuario encontrado
    return result.rows[0];
  } catch (error) {
    // Si ocurre algún error, lo retornamos para ser manejado por el controlador
    return error;
  }
};
