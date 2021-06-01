import React from 'react';
import { CoursePart } from '../types';

const Total = ({courseParts}:{courseParts:Array<CoursePart>}) => (
    <h1>
        Total number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </h1>
    );

export default Total;