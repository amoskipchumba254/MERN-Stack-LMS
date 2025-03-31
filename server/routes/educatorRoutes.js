import express from 'express'
import { addCourse, educatorDashboard, getEducatorCourses, getEnrolledStudentsData, updateRoleToEducator } from '../controllers/educatorController.js';
import upload from '../configs/multer.js';
import { ProtectEducator } from '../middlewares/authMiddleware.js';

const educatorRouter = express.Router()

// Add Educator Role
educatorRouter.get('/update-role', updateRoleToEducator)
educatorRouter.post('/add-course', upload.single('image'), ProtectEducator, addCourse)
educatorRouter.get('/courses', ProtectEducator, getEducatorCourses)
educatorRouter.get('/dashboard', ProtectEducator, educatorDashboard) 
educatorRouter.get('/enrolled-students', ProtectEducator, getEnrolledStudentsData)

export default educatorRouter;