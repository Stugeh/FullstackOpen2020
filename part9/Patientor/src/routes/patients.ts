import express from 'express';
import patientService from '../services/patientService';
import {NewPatient} from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonConfidentialPatients());
});

router.post('/', (req, res) => {
    try {

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const newPatient: NewPatient = patientService.addPatient(req.body);
        res.send(newPatient);
    } catch (err) {
        console.log('err :>> ', err);
    }
});

export default router;