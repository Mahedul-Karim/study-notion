import React from 'react'
import CreateCourses from './create-course/CreateCourses'
import { useLocation, useSearchParams } from 'react-router-dom'

const EditCourse = () => {

    const [searchParam] = useSearchParams();

     const isEditing = !!searchParam.get('isEditing')

  return (
    <CreateCourses isEditing={isEditing}/>
  )
}

export default EditCourse