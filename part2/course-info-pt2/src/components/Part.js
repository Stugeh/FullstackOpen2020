import React from 'react'

//Renders the name and amount of exercises in a given part of a course.

const Part = ({part}) => {
    return(
      <>
        <p>{part['name']} has {part['exercises']} exercises.</p>
      </>
    )
  }

export default Part