import express from 'express'
import { addNewCourse, educatorDashboard, getEducatorCourses, getEnrolledStudentsData, updateRoleToEducator } from '../controllers/educatorController.js';
import upload from '../configs/multer.js';
import { protectEducator } from '../middlewares/authMiddleware.js';

const educatorRouter = express.Router()

// Add Educator Role
educatorRouter.get('/update-role', updateRoleToEducator)
educatorRouter.post('/add-course', upload.single('image'), protectEducator, addNewCourse)
educatorRouter.get('/courses', ProtectEducator, getEducatorCourses)
educatorRouter.get('/dashboard', ProtectEducator, educatorDashboard) 
educatorRouter.get('/enrolled-students', ProtectEducator, getEnrolledStudentsData)

export default educatorRouter