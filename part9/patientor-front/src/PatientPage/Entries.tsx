import React from 'react';

import {Header} from 'semantic-ui-react';

import { Entry } from '../types';

import {useStateValue} from '../state';


const Entries = ({entries}:{entries:Entry[]}) => {
    const [{diagnoses},] = useStateValue();
    return (
        <div>
            <Header as="h1">Entries</Header>
            {entries.map((entry: Entry) =>
                <div key={entry.id}>
                    <b>{entry.date}: </b>
                    {entry.description}<br /><br/>
                    {entry.diagnosisCodes ? (
                        <div>
                            <Header as="h3">Diagnose codes</Header>
                            <ul>
                            {entry.diagnosisCodes
                                    .map(code =>
                                        <li key={code}>
                                            {code}: {diagnoses[code].name}
                                        </li>)}
                            </ul>
                        </div>) : null
                    }
                </div> 
            )}
        </div>
    );
};

export default Entries;