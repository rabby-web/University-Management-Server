import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = req.body;

  // const result = await UserService.createStudentIntoDB(password, studentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Created successfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
};
