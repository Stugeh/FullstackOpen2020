import React from 'react';
import { CoursePart } from '../types'

const Part = ({part}: {part: CoursePart}) => {
        switch (part.type) {
            case 'normal':
                break;
            case 'groupProject':
                break;
            case 'submission':
                break;
            default:
        }
    return <div></div>
};

export default Part;