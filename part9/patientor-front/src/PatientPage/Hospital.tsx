import React from 'react';
import { HospitalEntry } from '../types';

import {Header, Icon} from 'semantic-ui-react';

import {useStateValue} from '../state';

const Hospital = ({entry}: {entry: HospitalEntry}) => {
    const [{diagnoses},] = useStateValue();
    return (
        <div>
            <Header as="h2">
                {entry.date}: 
                Hospital
                <Icon name="hospital"/>
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
            <Header as="h3">Discharge:</Header>
            <b>date:</b> {entry.discharge.date}<br />
            <b>reason:</b> {entry.discharge.criteria}
        </div>
    );
};

export default Hospital;