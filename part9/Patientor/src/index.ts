import express from 'express';
const app = express();
import cors from 'cors';

import diagnoseRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

app.use(express.json());
app.use(cors());

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});