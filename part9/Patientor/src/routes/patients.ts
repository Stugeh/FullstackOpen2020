/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry, { toNewEntry } from '../utils';

const router = express.Router();

/* Patient list endpoints */

router.get('/', (_req, res) => {
    res.send(patientService.getNonConfidentialPatients());
});

router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedPatient = patientService.addPatient(newPatientEntry);
        res.send(addedPatient);
    } catch (err) {
        res.send(err.message);
    }
});

/* Individual Patients endpoints */ 

router.get('/:id',(req, res) => {
    const patient = patientService.getPatientById(req.params.id);
    if(!patient) res.send(404);
    res.send(patient);
});

// adds entry
router.post('/:id', (req, res) => {
    const newEntry = toNewEntry(req.body);
    console.log(`newEntry`, newEntry);
    res.send(201);
});

export default router;