import React from 'react'
import Header from './Header'
import Content from './Content'

//Calls component Header to render the name of the course, 
//after which it calls content to render the contents of said course.

const Course = ({course}) => 
    <div> 
        <Header name = {course.name} />
        <Content content = {course['parts']}/>
    </div>



export default Course