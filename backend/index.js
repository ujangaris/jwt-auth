import express from 'express';
import db from './config/Database.js';

const app = express();

// untuk memastikan db berjalan dengan baik
try {
  await db.authenticate();
  console.log('Database connected');
} catch (error) {
  console.error(error);
}

app.listen(5000, () => console.log('Server running at port 5000'));
