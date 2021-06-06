import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

import { Patient } from '../types';
import {setPatientList, useStateValue } from "../state";
import { apiBaseUrl } from "../constants";

import { Icon, Header } from 'semantic-ui-react';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';

const PatientPage = () => {
    const { id } = useParams<{ id: string }>();
    const [{patients}, dispatch] = useStateValue();
    const activePatient: Patient = patients[id];
    
    if (!activePatient) return <div>Could not find patient</div>;

    const fetchPatient = async () => {
        const { data: patientFromApi } = await axios
            .get<Patient>(`${apiBaseUrl}/patients/${id}`);
        patients[id] = patientFromApi;
        console.log(`patients`, patients);
        dispatch(setPatientList(Object.values(patients)));
    };

    if (activePatient.ssn === undefined) void fetchPatient();
    

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