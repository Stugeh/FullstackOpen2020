export enum Gender {
    Male = 'male',
    female = 'female'
}

export interface Diagnose {
    code: string,
    name: string,
    latin?: string
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth:  string,
    ssn:  string,
    gender:  string,
    occupation: string,
}

export type NewPatient = Omit<Patient, 'id'>;

export type NonConfidentialPatient = Omit<Patient, 'ssn'>;