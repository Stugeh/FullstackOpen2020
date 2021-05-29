import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, stringsToNum } from './exerciseCalculator';

app.use(express.json());
app.use(express.urlencoded());

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
        console.log(
            'Error, something bad happened, message: ', err.message
        );
    }
});

app.post('/exercises', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const body = req.body;
        if (!body.daily_exercises || !body.target) {
            res.send({ error: "parameters missing" });
            return;
        }
        const target = parseInt(body.target as string);
        if (isNaN(target)) {
            res.send({ error: "malformatted parameters" });
            return;
        }
        const daily_exercises = stringsToNum(
            body.daily_exercises as Array<string>
        );
        const parsedBody = { daily_exercises, target };
        const response = calculateExercises(parsedBody);
        res.send(response);
    } catch (err) {
        res.send({ error: "malformatted parameters" });
    }
});


const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});