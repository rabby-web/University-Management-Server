import {  RequestHandler } from 'express';
import { UserService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';





const createStudent:RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { password, student: studentData } = req.body;

    // data validation with zod
    // const zodParseData = studentValidationSchema.parse(studentData);

    const result = await UserService.createStudentIntoDB(password, studentData);

    // res.status(200).json({
    //   success: true,
    //   message: 'Student Created successfully',
    //   data: result,
    // });
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student Created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserController = {
  createStudent,
};
