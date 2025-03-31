//Este módulo contiene funciones para crear, listar, actualizar, eliminar y obtener  usuarios desde la base de datos.
import { query } from "../database/database.js";

export const createUser = async (params) => {
  try {
    // Extraemos los parámetros necesarios del objeto params
    const { type_document_id, user_type_id, email, name, document_number } =
      params;

    // Verificamos si el email ya existe en la base de datos
    const emailExists = await query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    // Si el email ya existe, retornamos un mensaje de error
    if (emailExists.rows.length > 0) {
      return {
        success: false,
        message: "Already registered email",
        data: null,
        totalCount: 0,
        hasMore: false,
      };
    }

    // Verificamos si el tipo de usuario especificado existe
    const userTypeExists = await query(
      "SELECT * FROM user_type WHERE id = $1",
      [user_type_id]
    );

    // Si el tipo de usuario no existe, retornamos un mensaje de error
    if (userTypeExists.rows.length === 0) {
      return {
        success: false,
        message: "You must indicate a Valid User Type",
        data: null,
        totalCount: 0,
        hasMore: false,
      };
    }

    // Llamamos al procedimiento almacenado sp_users para crear el usuario
    const result = await query(
      "SELECT * FROM sp_users($1, $2, $3, $4, $5, $6, $7)",
      [
        "save_user", // Acción a realizar
        null, // p_id (no se usa para la creación)
        type_document_id, // ID del tipo de documento
        user_type_id, // ID del tipo de usuario
        email, // Correo electrónico
        name, // Nombre del usuario
        document_number, // Número de documento
      ]
    );

    // Verificamos si la operación fue exitosa
    if (result.rows.length > 0) {
      // Retornamos respuesta exitosa con los datos del usuario creado
      return {
        success: true,
        message: "User successfully created.",
        data: result.rows[0],
        totalCount: result.rows[0].total_count,
        hasMore: result.rows[0].has_more,
      };
    } else {
      // Retornamos mensaje de error si no se pudo crear el usuario
      return {
        success: false,
        message: "Error creating the user.",
        data: null,
        totalCount: 0,
        hasMore: false,
      };
    }
  } catch (error) {
    // Capturamos cualquier error y retornamos un mensaje adecuado
    return {
      success: false,
      message: error.message || "Error creating the user.",
      data: null,
      totalCount: 0,
      hasMore: false,
    };
  }
};

export const getAllUsers = async (params) => {
  try {
    // Extraemos los parámetros con valores por defecto
    const { limit = 10, offset = 0, search_term = null } = params;

    // Llamamos al procedimiento almacenado para listar usuarios
    const result = await query(
      "SELECT * FROM sp_users($1, null, null, null, null, null, null, $2, $3, $4)",
      ["list_users", limit, offset, search_term]
    );

    // Verificamos si se encontraron usuarios
    if (result.rows && result.rows.length > 0) {
      // Mapeamos los resultados para tener un formato consistente
      const users = result.rows.map((row) => ({
        id: row.id,
        type_document_id: row.type_document_id,
        name_type_document_id: row.name_type_document_id,
        document_number: row.document_number,
        user_type_id: row.user_type_id,
        email: row.email,
        name: row.name,
        name_user_type: row.name_user_type,
      }));

      // Retornamos la lista de usuarios con metadata de paginación
      return {
        success: true,
        message: "Users listed correctly.",
        data: users,
        totalCount: result.rows[0].total_count,
        hasMore: result.rows[0].has_more,
      };
    } else {
      // Retornamos una lista vacía si no hay usuarios
      return {
        success: true,
        message: "No users found.",
        data: [],
        totalCount: 0,
        hasMore: false,
      };
    }
  } catch (error) {
    // Capturamos cualquier error y retornamos un mensaje adecuado
    return {
      success: false,
      message: "Error listing users.",
      data: [],
      totalCount: 0,
      hasMore: false,
      error: error.message,
    };
  }
};

export const updateUser = async (params, body) => {
  try {
    // Extraemos el ID del usuario de los parámetros
    const { id } = params;

    // Extraemos los datos a actualizar del cuerpo de la petición
    const { type_document_id, user_type_id, email } = body;

    // Verificamos si el tipo de usuario existe
    const userTypeExists = await query(
      "SELECT * FROM user_type WHERE id = $1",
      [user_type_id]
    );

    // Si el tipo de usuario no existe, lanzamos un error
    if (userTypeExists.rows.length === 0) {
      throw new Error("You must indicate a valid User Type");
    }

    // Verificamos si el usuario a actualizar existe
    const userExists = await query("SELECT * FROM users WHERE id = $1", [id]);

    // Si el usuario no existe, lanzamos un error
    if (userExists.rows.length === 0) {
      throw new Error("You must indicate a valid registration");
    }

    // Llamamos al procedimiento almacenado para actualizar el usuario
    const result = await query("SELECT * FROM sp_users($1, $2, $3, $4, $5)", [
      "update_user", // Acción a realizar
      id, // ID del usuario a actualizar
      type_document_id, // Nuevo ID del tipo de documento
      user_type_id, // Nuevo ID del tipo de usuario
      email, // Nuevo correo electrónico
    ]);

    // Retornamos el resultado de la operación
    return result.rows[0];
  } catch (error) {
    // Retornamos el error directamente
    return error;
  }
};

export const deleteUser = async (params) => {
  try {
    // Extraemos el ID del usuario de los parámetros
    const { id } = params;

    // Verificamos si el usuario a eliminar existe
    const userExists = await query("SELECT * FROM users WHERE id = $1", [id]);

    // Si el usuario no existe, retornamos un mensaje de error
    if (userExists.rows.length === 0) {
      return {
        success: false,
        message: "You must indicate a valid registration",
        data: null,
        totalCount: 0,
        hasMore: false,
      };
    }

    // Llamamos al procedimiento almacenado para eliminar el usuario
    await query("SELECT * FROM sp_users($1, $2)", ["delete_user", id]);

    // Retornamos mensaje de éxito
    return {
      success: true,
      message: "User successfully deleted.",
      data: null,
      totalCount: 0,
      hasMore: false,
    };
  } catch (error) {
    // Capturamos cualquier error y retornamos un mensaje adecuado
    return {
      success: false,
      message: error.message || "Error deleting user.",
      data: null,
      totalCount: 0,
      hasMore: false,
    };
  }
};

export const getOne = async (params) => {
  try {
    // Extraemos el ID del usuario de los parámetros
    const { id } = params;

    // Verificamos si el usuario existe
    const userExists = await query("SELECT * FROM users WHERE id = $1", [id]);

    // Si el usuario no existe, retornamos un mensaje de error
    if (userExists.rows.length === 0) {
      return {
        success: false,
        message: "You must indicate a valid registration",
        data: null,
        totalCount: 0,
        hasMore: false,
      };
    }

    // Llamamos al procedimiento almacenado para obtener los datos del usuario
    const result = await query("SELECT * FROM sp_users($1, $2)", [
      "get_user", // Acción a realizar
      id, // ID del usuario a consultar
    ]);

    // Verificamos si se encontró el usuario
    if (result.rows.length > 0) {
      // Retornamos los datos del usuario
      return {
        success: true,
        message: "User successfully obtained.",
        data: result.rows[0],
        totalCount: result.rows[0].total_count,
        hasMore: result.rows[0].has_more,
      };
    } else {
      // Retornamos mensaje de error si no se encontró el usuario
      return {
        success: false,
        message: "User not found.",
        data: null,
        totalCount: 0,
        hasMore: false,
      };
    }
  } catch (error) {
    // Capturamos cualquier error y retornamos un mensaje adecuado
    return {
      success: false,
      message: error.message || "Error obtaining the user.",
      data: null,
      totalCount: 0,
      hasMore: false,
    };
  }
};
