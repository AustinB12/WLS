export const validateISBN = (isbn: string): boolean => {
  // Remove hyphens and spaces
  const cleanISBN = isbn.replace(/[-\s]/g, '');

  // Check if it's 10 or 13 digits
  if (cleanISBN.length !== 10 && cleanISBN.length !== 13) {
    return false;
  }

  // Basic format validation
  return /^\d+$/.test(cleanISBN);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-()]{10,}$/;
  return phoneRegex.test(phone);
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateMinLength = (
  value: string,
  minLength: number
): boolean => {
  return value.length >= minLength;
};

export const validateMaxLength = (
  value: string,
  maxLength: number
): boolean => {
  return value.length <= maxLength;
};

export const validateYear = (year: number): boolean => {
  const currentYear = new Date().getFullYear();
  return year > 0 && year <= currentYear;
};
