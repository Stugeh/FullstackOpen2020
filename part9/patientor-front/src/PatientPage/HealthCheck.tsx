import React from 'react';
import { HealthCheckEntry, HealthCheckRating } from '../types';

import {Header, Icon, SemanticCOLORS} from 'semantic-ui-react';

import {useStateValue} from '../state';

const getHealthColor = (rating: HealthCheckRating): SemanticCOLORS => {
    if (rating === 0) return 'green';
    if (rating === 1) return 'yellow';
    if (rating === 2) return 'orange';
    if(rating===3) return 'red';
    return 'grey';
};

const HealthCheck = ({entry}: {entry: HealthCheckEntry}) => {
    const [{diagnoses},] = useStateValue();
    const healthColor = getHealthColor(entry.healthCheckRating);
    return (
        <div>
            <Header as="h2">
                {entry.date}: 
                Check up
                <Icon name="stethoscope"/>
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
            <Icon name="heart" color={ healthColor }/>
        </div>
    );
};



export default HealthCheck;