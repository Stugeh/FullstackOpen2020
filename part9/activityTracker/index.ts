import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';

interface HeightWeight {
    height: string,
    weight: string
}

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
    try {
        const formattedQuery: HeightWeight = {
            height: req.query.height as string,
            weight: req.query.weight as string
        };
        const response = calculateBmi(formattedQuery);
        res.send(response);
    } catch (err) {
        console.log('Error, something bad happened, message: ', err);
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});