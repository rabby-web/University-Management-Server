import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { updateStudentValidationSchema } from './student.validation';
import auth from '../../middleware/auth';

const router = express.Router();

// wll call controller function
// router.post('/create-student', StudentControllers.createStudent);
router.get('/', StudentControllers.getAllStudents);

router.get(
  '/:id',
  auth('student', 'admin', 'faculty'),
  StudentControllers.getSingleStudents,
);

router.patch(
  '/:id',
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete('/:id', StudentControllers.deleteStudent);

export const StudentRoutes = router;
