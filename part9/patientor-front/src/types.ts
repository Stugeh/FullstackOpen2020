export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[]
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: string[];
}

export interface StrippedEntry {
  [key: string]:
  string
  | string[]
  | number
  | { date: string, criteria: string }
  | { startDate: string, endDate: string}
}
export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare',
  employerName: string,
  sickLeave?: { startDate: string, endDate: string}
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital",
  discharge: { date: string, criteria: string },
}

export interface EntryFormFields extends Omit<BaseEntry, 'id'> {
  type: string;
  healthCheckRating: HealthCheckRating;
  dischargeDate: string,
  dischargeCriteria: string,
  employerName: string,
  sickLeaveStart: string,
  sickLeaveEnd: string
}

export type Entry =
  |HospitalEntry 
  |OccupationalHealthcareEntry 
  |HealthCheckEntry;

export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;
export type NewOccupationalEntry = Omit<OccupationalHealthcareEntry, 'id'>;
export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;

export type NonConfidentialPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewEntry =
    | NewHealthCheckEntry | NewOccupationalEntry | NewHospitalEntry;
