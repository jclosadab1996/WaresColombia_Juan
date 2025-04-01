import axios from '../helpers/axios';

export async function getUsers(params) {
  try {
    const { page, limit, searchTerm, silent } = params;

    const response = silent
      ? await axios.silentGet(`/users?page=${page}&limit=${limit}&search_term=${searchTerm}`)
      : await axios.get(`/users?page=${page}&limit=${limit}&search_term=${searchTerm}`);

    // Validación de la estructura de respuesta
    if (!response.data || !Array.isArray(response.data.data)) {
      throw new Error('Estructura de respuesta inválida');
    }

    // Verificación de campos requeridos
    const isValidData = response.data.data.every((user) => 
      user.id !== undefined &&
      user.email !== undefined &&
      user.document_number !== undefined
    );

    if (!isValidData) {
      throw new Error('Datos de usuario incompletos');
    }

    return {
      success: response.data.success,
      message: response.data.message,
      data: response.data.data,
      totalCount: response.data.totalCount,
      hasMore: response.data.hasMore
    };
  } catch (error) {
    console.error('Error en getUsers:', error);
    throw error; // React Query manejará el error
  }
}

export async function deleteUser(id) {
  try {
    const response = await axios.delete(`/users/${id}`);
    return {
      success: response.data.success,
      message: response.data.message,
      data: response.data.data,
      totalCount: response.data.totalCount,
      hasMore: response.data.hasMore
    };
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    throw error;
  }
}