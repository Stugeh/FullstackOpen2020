import React from 'react';
import { OccupationalHealthcareEntry } from '../types';

import {Header, Icon, Divider} from 'semantic-ui-react';

import {useStateValue} from '../state';

const Occupational = ({entry}: {entry: OccupationalHealthcareEntry}) => {
    const [{diagnoses},] = useStateValue();
    return (
        <div>
            <Header as="h2">
                {entry.date} 
                <Icon name="briefcase"/>
            </Header>
            {entry.description}<br /><br/>
            {entry.diagnosisCodes ? (
                <div>
                    <Header as="h3">Diagnose codes</Header>
                    {entry.diagnosisCodes
                        .map(code =>
                            <div key={code}>
                                {code}: {diagnoses[code].name}
                            </div>)}
                </div>) : null
            }
            <Divider/>
            <b>Employer:</b> {entry.employerName}
            <SickLeave leave={entry.sickLeave}/>
        </div>
    );
};

const SickLeave = ({ leave }: { leave: OccupationalHealthcareEntry['sickLeave'] }) => {
    if (!leave) return null;
    return (
        <div>
            <b>Sick leave: </b> {leave.startDate}<b> to </b>{leave.endDate}
        </div>
    );
};
    
    


export default Occupational;