import React from 'react'

import WidgetCourseItem from './Components/WidgetCourseItem'
import {Props} from './types'

export default function WidgetCourse({courses}: Props) {
  return (
    <>
      {courses.map((categoryCourses, index) => {
        if (categoryCourses.courses.length === 0) return <></>
        return <WidgetCourseItem key={index} courses={categoryCourses} />
      })}
    </>
  )
}
