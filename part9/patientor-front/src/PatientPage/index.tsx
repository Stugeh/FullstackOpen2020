import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

import { Entry, EntryFormFields, Patient, StrippedEntry} from '../types';
import {setPatientList, useStateValue } from "../state";
import { apiBaseUrl } from "../constants";

import { Icon, Header, Button } from 'semantic-ui-react';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';

import Entries from './Entries';
import AddEntryModal from '../AddEntryModal';

const PatientPage = () => {
    const { id } = useParams<{ id: string }>();
    const [{patients}, dispatch] = useStateValue();
    const activePatient: Patient = patients[id];
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    
    if (!activePatient) return <div>Could not find patient</div>;

    const fetchPatient = async () => {
        const { data: patientFromApi } = await axios
            .get<Patient>(`${apiBaseUrl}/patients/${id}`);
        patients[id] = patientFromApi;
        dispatch(setPatientList(Object.values(patients)));
    };

    if (activePatient.ssn === undefined) void fetchPatient();
    
  
    const openModal = (): void => setModalOpen(true);
  
    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };

    const submitNewEntry = async (values: EntryFormFields) => {
        try {
            const strippedEntry: StrippedEntry = {
                type: values.type,
                description: values.description,
                date: values.date,
                specialist: values.specialist,
            };
            strippedEntry.diagnosisCodes = values.diagnosisCodes ?
                values.diagnosisCodes : [];

            switch (values.type) {
                case 'Hospital':
                    const discharge = {
                        date: values.dischargeDate,
                        criteria: values.dischargeCriteria
                    };
                    strippedEntry.discharge = discharge;
                    break;
                case 'OccupationalHealthcare':
                    strippedEntry.employerName = values.employerName;
                    if (![''].includes(values.sickLeaveStart || values.sickLeaveEnd)) {
                        const sickLeave = {
                            startDate: values.sickLeaveStart ,
                            endDate: values.sickLeaveEnd 
                        };
                        strippedEntry.sickLeave = sickLeave;
                    }
                    break;
                case 'HealthCheck':
                    strippedEntry.healthCheckRating = values.healthCheckRating;
                    break;
            }

            const { data: newEntry } = await axios.post<Entry>(
                `${apiBaseUrl}/patients/${activePatient.id}`,
                strippedEntry
            );
            activePatient.entries.push(newEntry);
            const patientsCopy = {...patients};
            patientsCopy[id] = activePatient;
            dispatch({
                type: 'SET_PATIENT_LIST',
                payload: Object.values(patientsCopy),
            });
        } catch (e) {
            console.log(e.message);
            console.error(e.response?.data || 'Unknown Error');
            setError(e.response?.data?.error || 'Unknown error');
    
        }
    };

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
            <b>occupation: {activePatient.occupation}</b><br /><br/>
            {activePatient.entries ?
                <Entries entries={activePatient.entries} /> : null
            }
            <AddEntryModal
                onSubmit={submitNewEntry}
                onClose={closeModal}
                modalOpen={modalOpen}
                error={error}
            />
            <Button onClick={() => openModal()}>Add New Entry</Button>

        </div>
    );
};

export default PatientPage;