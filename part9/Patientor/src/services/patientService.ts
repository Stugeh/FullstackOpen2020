import patientData from '../data/patients.json';
import { Patient, NonConfidentialPatient } from '../types';

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

export default {getPatients, getNonConfidentialPatients}; 