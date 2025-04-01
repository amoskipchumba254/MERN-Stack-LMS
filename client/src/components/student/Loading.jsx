import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Loading = () => {

const { path } = useParams()
const navigate = useNavigate();

useEffect(()=>{
  if(path){
    const timer = setTimeout(()=>{
      navigate(`/${path}`)
    }, 5000)
    return () => clearTimeout(timer);
  }
},[])


  return (
    <div className='flex items-center justify-center min-h-screen'>
        <div className='w-16 border-4 border-t-4 border-gray-300 rounded-full sm:w-20 aspect-square border-t-blue-400 animate-spin'></div>
    </div>
  )
}

export default Loading