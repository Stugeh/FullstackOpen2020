import express from 'express';
const app = express();
import cors from 'cors';

import diagnoseRouter from './routes/diagnoses';

app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.use('/api/diagnoses', diagnoseRouter);

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});