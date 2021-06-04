import patientData from '../data/patients';
import { Patient, NonConfidentialPatient, NewPatient } from '../types';
import { v4 as uuidv4 } from 'uuid';

const patients: Array<Patient> = patientData;

const getPatients = (): Array<Patient> => {
    return patients;
};

const getNonConfidentialPatients = (): NonConfidentialPatient[] => {
    return patients.map(({id, name,dateOfBirth, gender,occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    })); 
};

const getPatientById = (id: string): Patient | undefined => {
    return patients.find(patient => patient.id === id);
};

const addPatient = (entry: NewPatient): Patient => {
    const newPatientEntry: Patient = {
        id: uuidv4(),
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {getPatients, getNonConfidentialPatients, addPatient, getPatientById}; 