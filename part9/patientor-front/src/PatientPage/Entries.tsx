import React from 'react';

import {Header} from 'semantic-ui-react';

import { Entry } from '../types';
 


const Entries = ({entries}:{entries:Entry[]}) => {
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
                                .map(code => <li key={code}>{code}</li>)}
                            </ul>
                        </div>) : null
                    }
                </div> 
            )}
        </div>
    );
};

export default Entries;