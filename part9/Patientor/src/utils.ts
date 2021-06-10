import {
    NewPatient,
    NewEntry,
    Gender,
    Entry,
    Diagnose,
    HealthCheckRating,
    NewHealthCheckEntry,
    NewOccupationalEntry,
} from './types';


const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isNumber = (num: unknown): num is number => {
    return typeof num === 'number' || num instanceof Number;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const isSickLeave = (obj: any): obj is NewOccupationalEntry['sickLeave'] => {
    if (Object.keys(obj).includes('startDate' && 'endDate')){
        return true
    }
    return false;
}

const parseName = (name: unknown):string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};

const parseDescription = (description: unknown):string => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description');
    }
    return description;
};

const parseDiagnoses = (diagnoses: unknown): Array<Diagnose['code']> => {
    if (!Array.isArray(diagnoses)) {
        throw new Error('Diagnoses is not an array');
    }
    return diagnoses.map(diagnosis => {
        if (!diagnosis.code || !isString(diagnosis.code)) {
            throw new Error(`${diagnosis} missing or malformatted diagnosis code`);
        }
        return diagnosis.code;
    }) as Array<Diagnose['code']>;
};

const parseSpecialist = (specialist: unknown):string => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist');
    }
    return specialist;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
  };

const parseSSN = (ssn: unknown):string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};

const parseGender = (gender: unknown):Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};
const parseOccupation = (occupation: unknown):string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};

const parseEntryType = (entryType: unknown): Entry['type'] => {
    const acceptedTypes = [
        'HealthCheck',
        'OccupationalHealthcare',
        'Hospital'
    ];
    if (
        !entryType
        || !isString(entryType)
        || !acceptedTypes.includes(entryType)
        ) {
            throw new Error('Incorrect or missing type');
        }
        return entryType as Entry['type'];
    };
    
const parseHealthCheckRating = (healthRating: unknown): HealthCheckRating => {
    if (!isNumber(healthRating) || ![0, 1, 2, 3].includes(healthRating)) {
        throw new Error('Health check rating is not valid');
    }
    return healthRating as HealthCheckRating;
};

const parseSickLeave = (leave: unknown): NewOccupationalEntry['sickLeave'] => {
    if (!isSickLeave(leave) && leave !== undefined) {
        throw new Error('Sick leave is malformatted.')
    }
    if (leave === undefined) return undefined;
    if (!isDate(leave.startDate) || !isDate(leave.endDate)) {
        throw new Error('Sick leave start or end date not a valid date')
    }
    return {startDate: leave.startDate, endDate: leave.endDate}
}

type PatientFields = {
    ssn: unknown,
    name: unknown,
    dateOfBirth: unknown,
    gender: unknown,
    occupation: unknown
};

const toNewPatientEntry = ({
    ssn,
    name,
    dateOfBirth,
    gender,
    occupation
}: PatientFields): NewPatient => {
    
    const newEntry: NewPatient = {
        ssn: parseSSN(ssn),
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: [],
    };
    return newEntry;
};

type EntryFields = {
    description: unknown,
    date: unknown,
    type: unknown,
    specialist: unknown,
    diagnosisCodes?: unknown,
    healthCheckRating?: unknown,
    employerName?: unknown,
    sickLeave?: unknown,
    discharge?: unknown,
};

export const toNewEntry = ({
    description,
    date,
    type,
    specialist,
    diagnosisCodes,
    healthCheckRating,
    employerName,
    sickLeave,
    discharge
}: EntryFields): NewEntry => {

    
    switch (parseEntryType(type)) {
        case 'HealthCheck':
            return {
                description: parseDescription(description),
                date: parseDate(date),
                specialist: parseSpecialist(specialist),
                healthCheckRating: parseHealthCheckRating(healthCheckRating),
                diagnosisCodes: diagnosisCodes ? parseDiagnoses(diagnosisCodes) : undefined,
                type: "HealthCheck",
            };
        case 'OccupationalHealthcare':
            return {
                description: parseDescription(description),
                date: parseDate(date),
                specialist: parseSpecialist(specialist),
                employerName: parseName(employerName),
                sickLeave: parseSickLeave(sickLeave)
                diagnosisCodes: diagnosisCodes ? parseDiagnoses(diagnosisCodes) : undefined,
                type: "OccupationalHealthcare",
            };
        
        case 'Hospital':

    }
};

export default toNewPatientEntry;

