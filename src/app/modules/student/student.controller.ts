import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students are retrieved successfully',
    data: result,
  });
});

const getSingleStudents = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is retrieved successfully',
    data: result,
  });
});

const deleteStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student delete is successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudents,
  deleteStudent,
};

// async (req, res, next) => {
//   try {
//     const result = await StudentServices.getAllStudentsFromDB();

//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Students are retrieved successfully',
//       data: result,
//     });
//   } catch (err) {
//     next(err);
//   }
// }
