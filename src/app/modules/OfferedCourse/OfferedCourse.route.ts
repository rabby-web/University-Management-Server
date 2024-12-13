import express from 'express';
import { OfferedCourseValidations } from './OfferedCourse.validation';
import validateRequest from '../../middleware/validateRequest';
import { OfferedCourseControllers } from './OfferedCourse.controller';

const router = express.Router();

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);
router.get('/:id', OfferedCourseControllers.getSingleOfferedCourses);
router.delete('/:id', OfferedCourseControllers.deleteOfferedCourseFromDB);

router.get('/', OfferedCourseControllers.getAllOfferedCourses);
router.patch(
  '/:id',
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse,
);

export const offeredCourseRoutes = router;
