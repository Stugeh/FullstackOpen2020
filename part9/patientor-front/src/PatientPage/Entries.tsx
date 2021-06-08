import React from 'react';

import {Header, Segment} from 'semantic-ui-react';

import { Entry } from '../types';

import HealthCheck from './HealthCheck';
import Hospital from './Hospital';
import Occupational from './Occupational'; 

const EntryListing: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case 'Hospital':
            return <Hospital entry={ entry }/>;
        case 'OccupationalHealthcare':
            return <Occupational entry={ entry } />;
        case 'HealthCheck':
            return <HealthCheck entry={ entry }/>;
        default:
            return assertNever(entry);
    }
};

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Entries = ({entries}:{entries:Entry[]}) => {
    return (
        <div>
            <Header as="h1">Entries</Header>
            {entries.map((entry: Entry) =>
                <Segment raised key={entry.id}>
                    <EntryListing entry={entry}/>
                </Segment>
            )}
        </div>
    );
};


export default Entries;