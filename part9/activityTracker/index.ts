import express from 'express';
const app = express();
const bmiCalc = require('./bmiCalculator')


app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
    const response = bmiCalc(req.query)
    res.send(response)
})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});