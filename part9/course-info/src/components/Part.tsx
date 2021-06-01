import React from 'react';
import { CoursePart } from '../types'

const Part = ({part}: {part: CoursePart}) => { 
    switch (part.type) {
        case 'normal':
            return (
                <div>
                    <h3>{part.name}:</h3>
                    {part.description}<br/>
                    Exercises: {part.exerciseCount}<br/>
                </div>
            )
        case 'groupProject':
            return (
                <div>
                    <h3>{part.name}:</h3>
                    Exercises: {part.exerciseCount}<br/>
                    Group projects: {part.groupProjectCount}<br/>
                </div>
            )
        case 'submission':
            return (
                <div>
                    <h3>{part.name}:</h3>
                    {part.description}<br/>
                    Exercises: {part.exerciseCount}<br/>
                    Submission: {part.exerciseSubmissionLink}<br/>
                </div>
            )
        case 'special':
            return (
                <div>
                    <h3>{part.name}:</h3>
                    {part.description}<br />
                    Requirements: {part.requirements}<br />
                    Exercises: {part.exerciseCount}<br/>
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