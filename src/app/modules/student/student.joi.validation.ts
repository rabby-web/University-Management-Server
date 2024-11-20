import Joi from 'joi';

const userNameSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .max(20)
    .regex(/^[A-Z][a-z]*$/, { name: 'capitalize' })
    .message('First Name must start with a capital letter'),
  middleName: Joi.string().trim(),
  lastName: Joi.string().required(),
});

const guardianSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.string().required(),
});

const localGuardianSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

export const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  //   password: Joi.string().required().max(30),
  name: userNameSchema.required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  dateOfBirth: Joi.string(),
  email: Joi.string().email().required(),
  contactNo: Joi.string().required(),
  emergencyContactNo: Joi.string().required(),
  bloodGroup: Joi.string().valid(
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
  ),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianSchema.required(),
  localGuardian: localGuardianSchema.required(),
  profileImg: Joi.string(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});

export default studentValidationSchema;

// creating a schema validation using joi

// Joi schema for userName
// const userNameValidationSchema = Joi.object({
//   firstName: Joi.string()
//     .trim()
//     .required()
//     .min(5)
//     .max(50)
//     .pattern(/^[A-Z][a-z]*(\s[A-Z][a-z]*)?$/, 'capitalized words')
//     .messages({
//       'string.empty': 'First name is required.',
//       'string.min': 'The length must be at least 5 characters.',
//       'string.max': 'First name cannot exceed 50 characters.',
//       'string.pattern.base': '{#value} must be one or two words, with each word capitalized.',
//     }),
//   middleName: Joi.string().trim().max(50).allow(null),
//   lastName: Joi.string()
//     .trim()
//     .required()
//     .min(5)
//     .max(50)
//     .pattern(/^[A-Z][a-z]*(\s[A-Z][a-z]*)?$/, 'capitalized words')
//     .messages({
//       'string.empty': 'Last name is required.',
//       'string.min': 'The length must be at least 5 characters.',
//       'string.max': 'Last name cannot exceed 50 characters.',
//       'string.pattern.base': '{#value} must be one or two words, with each word capitalized.',
//     })
// });

// // Joi schema for guardian
// const guardianValidationSchema = Joi.object({
//   fatherName: Joi.string().trim().required().min(5).max(50).pattern(/^[A-Z][a-z]*(\s[A-Z][a-z]*)?$/, 'capitalized words')
//     .messages({
//       'string.empty': "Father's name is required.",
//       'string.min': 'The length must be at least 5 characters.',
//       'string.max': "Father's name cannot exceed 50 characters.",
//       'string.pattern.base': '{#value} must be one or two words, with each word capitalized.',
//     }),
//   fatherOccupation: Joi.string().trim().required().messages({
//     'string.empty': "Father's occupation is required",
//   }),
//   fatherContactNo: Joi.string()
//     .trim()
//     .required()
//     // .pattern(/^(?:\+8801|01)[3-9]\d{8}$/)
//     .messages({
//       'string.empty': 'Contact number is required.',
//       'string.pattern.base':
//         'Contact number must be a valid number (e.g., +88017XXXXXXXX or 017XXXXXXXX).',
//     }),
//   motherName: Joi.string().trim().required().min(5).max(50).pattern(/^[A-Z][a-z]*(\s[A-Z][a-z]*)?$/, 'capitalized words')
//     .messages({
//       'string.empty': "Mother's name is required.",
//       'string.min': 'The length must be at least 5 characters.',
//       'string.max': "Mother's name cannot exceed 50 characters.",
//       'string.pattern.base': '{#value} must be one or two words, with each word capitalized.',
//     }),
//   motherOccupation: Joi.string().trim().required().messages({
//     'string.empty': "Mother's occupation is required",
//   }),
//   motherContactNo: Joi.string()
//     .trim()
//     .required()
//     // .pattern(/^(?:\+8801|01)[3-9]\d{8}$/)
//     .messages({
//       'string.empty': 'Contact number is required.',
//       'string.pattern.base':
//         'Contact number must be a valid number (e.g., +88017XXXXXXXX or 017XXXXXXXX).',
//     }),
// });

// // joi schema for local gurdian
// const localGuardianValidationSchema = Joi.object({
//   name: Joi.string().trim().required().min(5).max(50).pattern(/^[A-Z][a-z]*(\s[A-Z][a-z]*)?$/, 'capitalized words')
//     .messages({
//       'string.empty': "Name is required.",
//       'string.min': 'The length must be at least 5 characters.',
//       'string.max': "Name cannot exceed 50 characters.",
//       'string.pattern.base': '{#value} must be one or two words, with each word capitalized.',
//     }),
//   occupation: Joi.string().trim().required().messages({
//     'string.empty': 'Occupation is required',
//   }),
//   contactNo: Joi.string()
//     .trim()
//     .required()
//     // .pattern(/^(?:\+8801|01)[3-9]\d{8}$/)
//     .messages({
//       'string.empty': 'Contact number is required.',
//       'string.pattern.base':
//         'Contact number must be a valid number (e.g., +88017XXXXXXXX or 017XXXXXXXX).',
//     }),
//   address: Joi.string().trim().required().messages({
//     'string.empty': 'Address is required',
//   }),
// });

// // joi schema for student
// const studentValidationSchema = Joi.object({
//   id: Joi.string().trim().required().messages({
//     'string.empty': "Student's ID is required.",
//   }),
//   name: userNameValidationSchema.required().messages({
//     'object.base': "Student's name is required",
//   }),
//   profileImg: Joi.string().trim().uri().allow(null),
//   gender: Joi.string().valid('male', 'female').required().messages({
//     'any.only': "Gender must be either 'male' or 'female'",
//     'string.empty': 'Gender is required',
//   }),
//   dateOfBirth: Joi.date().iso().allow(null),
//   email: Joi.string().trim().email().required().messages({
//     'string.email': '#value is not a valid email type',
//     'string.empty': 'Email address is required',
//   }),
//   contactNo: Joi.string()
//     .trim()
//     .required()
//     // .pattern(/^(?:\+8801|01)[3-9]\d{8}$/)
//     .messages({
//       'string.empty': 'Contact number is required.',
//       'string.pattern.base':
//         'Contact number must be a valid number (e.g., +88017XXXXXXXX or 017XXXXXXXX).',
//     }),
//   emergencyContactNo: Joi.string()
//     .trim()
//     .required()
//     // .pattern(/^(?:\+8801|01)[3-9]\d{8}$/)
//     .messages({
//       'string.empty': 'Emergency Contact number is required.',
//       'string.pattern.base':
//         'Contact number must be a valid number (e.g., +88017XXXXXXXX or 017XXXXXXXX).',
//     }),
//   bloodGroup: Joi.string()
//     .valid('A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-')
//     .allow(null)
//     .messages({
//       'any.only':
//         'Blood group must be one of A+, A-, AB+, AB-, B+, B-, O+, O-.',
//     }),
//   presentAddress: Joi.string().trim().required().messages({
//     'string.empty': 'Present Address is required',
//   }),
//   permanentAddress: Joi.string().trim().required().messages({
//     'string.empty': 'Permanent Address is required',
//   }),
//   guardian: guardianValidationSchema.required().messages({
//     'object.base': 'guardian information is required',
//   }),
//   localGuardian: localGuardianValidationSchema.required().messages({
//     'object.base': 'Local guardian information is required',
//   }),
//   isActive: Joi.string().valid('active', 'blocked').default('active').messages({
//     'any.only': "Status must be either 'active' or 'blocked'",
//   }),
// });
