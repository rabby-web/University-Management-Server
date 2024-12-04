import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

// wll call controller function
// router.post('/create-student', StudentControllers.createStudent);
router.get('/', StudentControllers.getAllStudents);

router.get('/:studentId', StudentControllers.getSingleStudents);

router.patch('/:studentId', StudentControllers.updateStudent);

router.delete('/:studentId', StudentControllers.deleteStudent);

export const StudentRoutes = router;
