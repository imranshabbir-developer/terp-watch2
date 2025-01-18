import validator from "validator";

export const validateRegister = (data) => {
  const errors = {};

  // Validate username
  if (!data.username || data.username.trim().length < 3 || data.username.trim().length > 30) {
    errors.username = "Username must be between 3 and 30 characters long.";
  }

  // Validate email
  if (!data.email || !validator.isEmail(data.email)) {
    errors.email = "Invalid email address.";
  }

  // Validate password
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!data.password || !strongPasswordRegex.test(data.password)) {
    errors.password =
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateLogin = (data) => {
  const errors = {};

  // Validate email
  if (!data.email || !validator.isEmail(data.email)) {
    errors.email = "Invalid email address.";
  }

  // Validate password
  if (!data.password) {
    errors.password = "Password is required.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
