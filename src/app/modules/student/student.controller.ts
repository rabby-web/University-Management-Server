import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import Joi from 'joi';

const createStudent = async (req: Request, res: Response) => {
  try {
    // creating a schema validation using joi

    // Joi schema for userName
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .required()
    .min(5)
    .max(50)
    .pattern(/^[A-Z][a-z]*(\s[A-Z][a-z]*)?$/, 'capitalized words')
    .messages({
      'string.empty': 'First name is required.',
      'string.min': 'The length must be at least 5 characters.',
      'string.max': 'First name cannot exceed 50 characters.',
      'string.pattern.base': '{#value} must be one or two words, with each word capitalized.',
    }),
  middleName: Joi.string().trim().max(50).allow(null),
  lastName: Joi.string()
    .trim()
    .required()
    .min(5)
    .max(50)
    .pattern(/^[A-Z][a-z]*(\s[A-Z][a-z]*)?$/, 'capitalized words')
    .messages({
      'string.empty': 'Last name is required.',
      'string.min': 'The length must be at least 5 characters.',
      'string.max': 'Last name cannot exceed 50 characters.',
      'string.pattern.base': '{#value} must be one or two words, with each word capitalized.',
    })
});

// Joi schema for guardian
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().trim().required().min(5).max(50).pattern(/^[A-Z][a-z]*(\s[A-Z][a-z]*)?$/, 'capitalized words')
    .messages({
      'string.empty': "Father's name is required.",
      'string.min': 'The length must be at least 5 characters.',
      'string.max': "Father's name cannot exceed 50 characters.",
      'string.pattern.base': '{#value} must be one or two words, with each word capitalized.',
    }),
  fatherOccupation: Joi.string().trim().required().messages({
    'string.empty': "Father's occupation is required",
  }),
  fatherContactNo: Joi.string()
    .trim()
    .required()
    // .pattern(/^(?:\+8801|01)[3-9]\d{8}$/)
    .messages({
      'string.empty': 'Contact number is required.',
      'string.pattern.base':
        'Contact number must be a valid number (e.g., +88017XXXXXXXX or 017XXXXXXXX).',
    }),
  motherName: Joi.string().trim().required().min(5).max(50).pattern(/^[A-Z][a-z]*(\s[A-Z][a-z]*)?$/, 'capitalized words')
    .messages({
      'string.empty': "Mother's name is required.",
      'string.min': 'The length must be at least 5 characters.',
      'string.max': "Mother's name cannot exceed 50 characters.",
      'string.pattern.base': '{#value} must be one or two words, with each word capitalized.',
    }),
  motherOccupation: Joi.string().trim().required().messages({
    'string.empty': "Mother's occupation is required",
  }),
  motherContactNo: Joi.string()
    .trim()
    .required()
    // .pattern(/^(?:\+8801|01)[3-9]\d{8}$/)
    .messages({
      'string.empty': 'Contact number is required.',
      'string.pattern.base':
        'Contact number must be a valid number (e.g., +88017XXXXXXXX or 017XXXXXXXX).',
    }),
});

// joi schema for local gurdian
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().trim().required().min(5).max(50).pattern(/^[A-Z][a-z]*(\s[A-Z][a-z]*)?$/, 'capitalized words')
    .messages({
      'string.empty': "Name is required.",
      'string.min': 'The length must be at least 5 characters.',
      'string.max': "Name cannot exceed 50 characters.",
      'string.pattern.base': '{#value} must be one or two words, with each word capitalized.',
    }),
  occupation: Joi.string().trim().required().messages({
    'string.empty': 'Occupation is required',
  }),
  contactNo: Joi.string()
    .trim()
    .required()
    // .pattern(/^(?:\+8801|01)[3-9]\d{8}$/)
    .messages({
      'string.empty': 'Contact number is required.',
      'string.pattern.base':
        'Contact number must be a valid number (e.g., +88017XXXXXXXX or 017XXXXXXXX).',
    }),
  address: Joi.string().trim().required().messages({
    'string.empty': 'Address is rquired',
  }),
});

// joi schema for student
const studentValidationSchema = Joi.object({
  id: Joi.string().trim().required().messages({
    'string.empty': "Student's ID is required.",
  }),
  name: userNameValidationSchema.required().messages({
    'object.base': "Student's name is required",
  }),
  profileImg: Joi.string().trim().uri().allow(null),
  gender: Joi.string().valid('male', 'female').required().messages({
    'any.only': "Gender must be either 'male' or 'female'",
    'string.empty': 'Gender is required',
  }),
  dateOfBirth: Joi.date().iso().allow(null),
  email: Joi.string().trim().email().required().messages({
    'string.email': '#value is not a valid email type',
    'string.empty': 'Email address is required',
  }),
  contactNo: Joi.string()
    .trim()
    .required()
    // .pattern(/^(?:\+8801|01)[3-9]\d{8}$/)
    .messages({
      'string.empty': 'Contact number is required.',
      'string.pattern.base':
        'Contact number must be a valid number (e.g., +88017XXXXXXXX or 017XXXXXXXX).',
    }),
  emergencyContactNo: Joi.string()
    .trim()
    .required()
    // .pattern(/^(?:\+8801|01)[3-9]\d{8}$/)
    .messages({
      'string.empty': 'Emergency Contact number is required.',
      'string.pattern.base':
        'Contact number must be a valid number (e.g., +88017XXXXXXXX or 017XXXXXXXX).',
    }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-')
    .allow(null)
    .messages({
      'any.only':
        'Blood group must be one of A+, A-, AB+, AB-, B+, B-, O+, O-.',
    }),
  presentAddress: Joi.string().trim().required().messages({
    'string.empty': 'Present Address is required',
  }),
  permanentAddress: Joi.string().trim().required().messages({
    'string.empty': 'Permanent Address is required',
  }),
  guardian: guardianValidationSchema.required().messages({
    'object.base': 'Gurdian information is required',
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    'object.base': 'Local gurdian information is required',
  }),
  isActive: Joi.string().valid('active', 'blocked').default('active').messages({
    'any.only': "Status must be either 'active' or 'blocked'",
  }),
});

    const { student: studentData } = req.body;

    const { error, value } = studentValidationSchema.validate(studentData);
    console.log({ error }, { value });
    if (error) {
      res.status(500).json({
        success: false,
        message: 'something wen wrong',
        error: error,
      });
    }
    const result = await StudentServices.createStudentIntoDB(studentData);
    res.status(200).json({
      success: true,
      message: 'Student Created successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something wen wrong',
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something wen wrong',
      error: err,
    });
  }
};

const getSingleStudents = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something wen wrong',
      error: err,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudents,
};
