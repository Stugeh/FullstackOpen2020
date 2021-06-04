import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

import { Patient } from '../types';
import { useStateValue } from "../state";
import { apiBaseUrl } from "../constants";

import { Icon, Header } from 'semantic-ui-react';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';

const PatientPage = () => {
    const { id } = useParams<{ id: string }>();
    const [{activePatient}, dispatch] = useStateValue();

    const fetchPatient = async () => {
        const {data: patientFromApi} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        dispatch({type:'SET_ACTIVE_PATIENT', payload: patientFromApi});
    };

    void fetchPatient();
    
    if (!activePatient) return <div></div>;

    let iconType: SemanticICONS = 'mars';
    if (activePatient.gender === 'female') iconType = 'venus';
    if (activePatient.gender === 'other') iconType = 'transgender alternate';

    return (
        <div>
            <Header as='h1'>
                {activePatient.name}
                <Icon name={iconType}/>
            </Header>
            <b>ssn: {activePatient.ssn}</b>
            <br/>
            <b>occupation: { activePatient.occupation }</b>
        </div>
    );
};

export default PatientPage;