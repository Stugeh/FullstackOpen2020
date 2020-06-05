import React from 'react'
import Part from './Part'

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

export default Content