import React from 'react'
import Heading from '../../common/Heading';
import Grid from '../../common/Grid';

const EnrolledCourses = () => {
  return (
    <>
    <Heading>Enrolled Courses</Heading>
    <div className='rounded-md overflow-x-auto hideScrollbar border border-solid border-richblack-700' id="gridItems">
      <div className='min-w-[930px] grid grid-cols-[1.3fr_0.8fr_0.9fr_0.1fr] bg-richblack-700 px-4 py-3 text-[15px]'>
        <div>Course Name</div>
        <div>Duration</div>
        <div>Progress</div>
        <div></div>
      </div>
     <Grid />
     <Grid />
     <Grid />
    </div>
    </>
  )
}

export default EnrolledCourses