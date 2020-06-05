import React from 'react';
import './App.css';

//Renders the name and amount of exercises in a given part of a course.
const Part = ({part}) => {
  return(
    <>
      <p>{part.name} has {part.exercises} exercises.</p>
    </>
  )
}


//Calculates the total amount of exercises in a course and recursively calls 
//Part to render the course info of each part.
const Content = ({content}) => {
  const total = content.reduce((sum, p) => sum += p.exercises, 0)

  return(
    <div>  
      {content.map(part => 
          <Part key = {part.id} part = {part} />               
      )}
      <br></br>
      Total number of exercises in this course: {total}
    </div> 
  )
}


//Renders header of a course
const Header = ({name}) => {
  return(
    <>
      <h1>{name}</h1>
    </>

  )
}


//Calls component Header to render the name of the course, 
//after which it calls content to render the contents of said course.
const Course = ({courses}) => {
  return(
      courses.map( course =>  
      <div key={course.id}>
          <Header name = {course.name} />
          <Content content = {course.parts}/>
      </div>    
      )   
  )
}


//defines the dictionary containing courses and calls Course to render the text on screen.
const App = () => {
  
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ] 

  return (
      <> <Course courses={courses} /> </>   
  ) 
}

export default App;
