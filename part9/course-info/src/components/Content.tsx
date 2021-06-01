import React from 'react';
import {CoursePart} from '../types';
import Part from './Part'

const Content = ({courseParts}:{courseParts:Array<CoursePart>}) => (
    <div>
        {console.log(`1`, courseParts)}
        {courseParts.map(part => (
            <div key={part.name}>
                <Part part={part}/>
            </div>
        ))}
    </div>
    );

export default Content;