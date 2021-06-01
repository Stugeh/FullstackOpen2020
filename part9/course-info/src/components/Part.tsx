import React from 'react';
import { CoursePart } from '../types'

const Part = ({part}: {part: CoursePart}) => { 
    switch (part.type) {
            case 'normal':
                return (
                    <div>
                        <h2>{part.name}:</h2>
                        <p>{part.description}</p>
                        <p>Exercises: {part.exerciseCount}</p>
                    </div>
                )
            case 'groupProject':
                return (
                    <div>
                        <h2>{part.name}:</h2>
                        <p>Exercises: {part.exerciseCount}</p>
                        <p>Group projects: {part.groupProjectCount}</p>
                    </div>
                )
            case 'submission':
                return (
                    <div>
                        <h2>{part.name}:</h2>
                        <p>{part.description}</p>
                        <p>Exercises: {part.exerciseCount}</p>
                        <p>{part.exerciseSubmissionLink}</p>
                    </div>
                )
            default:
                return assertNever(part)
        }
};

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

export default Part;