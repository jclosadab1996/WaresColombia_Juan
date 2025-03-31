// Este archivo contiene la configuración para validar los datos de entrada en las operaciones de creación, actualización y login de usuarios utilizando

//Esquema de validación para la creación de usuarios.Define las reglas de validación para cada campo requerido en la creación de un usuario.
export const createUserValidatorSchema = {
  // Validación para el ID del tipo de documento.

  type_document_id: {
    in: ["body"], // El valor debe estar en el cuerpo de la petición HTTP
    isInt: true, // El valor debe ser un número entero
    notEmpty: true, // El valor no puede estar vacío
    exists: true, // El campo debe existir en la petición
    errorMessage:
      "The ID of the document type is required and must be an integer.", // Mensaje de error personalizado
  },

  /*
   * Validación para el ID del tipo de usuario. Define las mismas reglas que el tipo de documento pero para identificar el rol o tipo de usuario.
   */
  user_type_id: {
    in: ["body"],
    isInt: true,
    notEmpty: true,
    exists: true,
    errorMessage: "The user type ID is required and must be an integer.",
  },

  /**
   * Validación para el correo electrónico del usuario. Asegura que el campo sea una cadena con formato de email válido.
   */
  email: {
    in: ["body"],
    isString: true,
    isEmail: true,
    exists: true,
    errorMessage:
      "Email address is required and must be valid axis: email@hotmail.com",
  },

  /**
   * Validación para el nombre del usuario. Verifica que sea una cadena de texto y que exista en la petición.
   */
  name: {
    in: ["body"],
    isString: true,
    exists: true,
    errorMessage: "Name is required and must be a text string.",
  },

  /**
   * Validación para el número de documento del usuario. Comprueba que sea una cadena de texto y que exista en la petición.
   */
  document_number: {
    in: ["body"],
    isString: true,
    exists: true,
    errorMessage: "Document number is required and must be a text string.",
  },
};

// Esquema de validación para la actualización de usuarios.
// Similar al esquema de creación, pero con algunas diferencias clave:
// Incluye validación del ID en los parámetros de la URL
// Marca algunos campos como opcionales para permitir actualización parcial
// @const {Object} updateUserValidatorSchema

export const updateUserValidatorSchema = {
  /**
   * Validación para el ID del usuario a actualizar. A diferencia de los otros campos, este debe estar en los parámetros de la URL.
   */
  id: {
    in: ["params"], // El valor debe estar en los parámetros de la URL
    isInt: true, // El valor debe ser un número entero
    notEmpty: true, // El valor no puede estar vacío
    exists: true, // El campo debe existir en la petición
    errorMessage: "You must enter a valid user id", // Mensaje de error personalizado
  },

  /**
   * Validación para el ID del tipo de documento en actualizaciones. A diferencia del esquema de creación, este campo es opcional.
   */
  type_document_id: {
    in: ["body"],
    isInt: true,
    isOptional: true,
    errorMessage:
      "The ID of the document type is required and must be an integer.",
  },

  /**
   * Validación para el ID del tipo de usuario en actualizaciones. Campo opcional para actualización parcial.
   */
  user_type_id: {
    in: ["body"],
    isInt: true,
    isOptional: true,
    errorMessage: "The user type ID is required and must be an integer.",
  },

  /**
   * Validación para el correo electrónico en actualizaciones. Campo opcional, pero si se proporciona debe ser un email válido.
   */
  email: {
    in: ["body"],
    isString: true,
    isEmail: true,
    isOptional: true,
    errorMessage:
      "Email address is required and must be valid axis: email@hotmail.com",
  },

  /**
   * Validación para el nombre en actualizaciones. Campo opcional para permitir actualización parcial.
   */
  name: {
    in: ["body"],
    isString: true,
    isOptional: true,
    errorMessage: "Name must be a string.",
  },

  /**
   * Validación para el número de documento en actualizaciones. A diferencia de otros campos en la actualización, este sigue siendo obligatorio.
   */
  document_number: {
    in: ["body"],
    isString: true,
    exists: true,
    errorMessage: "Document number is required and must be a text string.",
  },
};

// Esquema de validación para el proceso de login.
// Más simple que los anteriores, solo requiere validar el email del usuario.
// @const {Object} loginValidatorSchema

export const loginValidatorSchema = {
  /**
   * Validación para el correo electrónico en el login. Debe ser una cadena con formato de email válido.
   */
  email: {
    in: ["body"], // El valor debe estar en el cuerpo de la petición HTTP
    isString: true, // El valor debe ser una cadena de texto
    isEmail: true, // El valor debe tener formato de email válido
    exists: true, // El campo debe existir en la petición
    errorMessage:
      "Email address is required and must be valid axis: email@hotmail.com", // Mensaje de error personalizado
  },
};
