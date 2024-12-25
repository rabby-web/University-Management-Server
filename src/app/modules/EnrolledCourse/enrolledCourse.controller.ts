import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { EnrolledCourseServices } from './enrolledCourse.service';

const createEnrolledCourse = catchAsync(async (req, res) => {
  //   const userId = req.user.userId;
  const userId = req.user.userId;
  const result = await EnrolledCourseServices.createEnrolledCourseIntoDB(
    userId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is enrolled successfully',
    data: result,
  });
});

export const EnrolledCourseControllers = {
  createEnrolledCourse,
};
