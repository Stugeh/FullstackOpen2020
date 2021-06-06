/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonConfidentialPatients());
});

router.get('/:id',(req, res) => {
    const patient = patientService.getPatientById(req.params.id);
    if(!patient) res.send(404);
    res.send(patient);
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

export default router;