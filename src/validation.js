// Función para validar la contraseña
const isValidPassword = (password) => {
    const hasMinLength = password.length > 6;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return hasMinLength && hasNumber && hasSpecialChar;
  };
  
  module.exports = isValidPassword;  // Exporta la función directamente
  