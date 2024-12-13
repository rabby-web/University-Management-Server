import express from 'express';
import { OfferedCourseValidations } from './OfferedCourse.validation';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();



router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
);



export const offeredCourseRoutes = router;