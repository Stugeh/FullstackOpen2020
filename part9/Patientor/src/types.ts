export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
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
    gender:  Gender,
    occupation: string,
    entries: Entry[],
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare',
    employerName: string,
    sickLeave?: { startDate: string, endDate: string}
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital",
    discharge: { date: string, criteria: string },
}

export type NewPatient = Omit<Patient, 'id'>;

export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;
export type NewOccupationalEntry = Omit<OccupationalHealthcareEntry, 'id'>;
export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;

export type NonConfidentialPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewEntry =
    | NewHealthCheckEntry | NewOccupationalEntry | NewHospitalEntry;

export type Entry =
    | HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;
