import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from '../../componenets/student/Loading'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyCourses = () => {

  const {currency, backendUrl, isEducator, getToken} = useContext(AppContext)

  const [courses, setCourses] = useState(null)

  const fetchEducatorCourses = async () => {
    try {
      const token = await getToken()
      const { data } = await axios.get(backendUrl + '/api/educator/courses', { headers: { Authorization: `Bearer ${token}` }})

      data.success && setCourses(data.courses)

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if(isEducator){
      fetchEducatorCourses()
    }
  }, [isEducator])

  return courses ? (
    <div className='flex flex-col items-start justify-between h-screen p-4 pt-8 pb-0 md:p-8 md:pb-0'>
        <div className='w-full'>
          <h2 className='pb-4 text-lg font-medium'>My Courses</h2>
            <div className='flex flex-col items-center w-full max-w-4xl overflow-hidden bg-white border rounded-md border-gray-500/20'>
              <table className='w-full overflow-hidden table-fixed md:table-auto'>
                <thead className='text-sm text-left text-gray-900 border-b border-gray-500/20'>
                  <tr>
                    <th className='px-4 py-3 font-semibold truncate'>All Courses</th>
                    <th className='px-4 py-3 font-semibold truncate'>Earnings</th>
                    <th className='px-4 py-3 font-semibold truncate'>Students</th>
                    <th className='px-4 py-3 font-semibold truncate'>Published On</th>
                  </tr>
                </thead>
                <tbody className='text-sm text-gray-500'>
                  {courses.map((course) => (
                    <tr key={course._id} className='border-b border-gray-500/20'>
                      <td className='flex items-center py-3 pl-2 space-x-3 truncate md:px-4 md:pl-4'>
                        <img src={course.courseThumbnail} alt="Course Image" className='w-16' />
                        <span className='hidden truncate md:block'>{course.courseTitle}</span>
                      </td>
                      <td className='px-4 py-3'>{currency} {Math.floor(course.enrolledStudents.length * (course.coursePrice - course.discount * course.coursePrice / 100))}</td>
                      <td className='px-4 py-3'>{course.enrolledStudents.length}</td>
                      <td className='px-4 py-3'>
                        {new Date(course.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
    </div>
  ) : <Loading />
}

export default MyCourses