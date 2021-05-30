import patientData from '../data/patients.json';
import { Patient } from '../types';

const patients: Array<Patient> = patientData;

const getPatients = (): Array<Patient> => {
    return patients;
};

export default {getPatients};