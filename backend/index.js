import express from 'express';
import db from './config/Database.js';
import router from './routes/index.js';
// import Users from './models/UserModel.js';

const app = express();

// untuk memastikan db berjalan dengan baik
try {
  await db.authenticate();
  console.log('Database connected');

  //   generate table otomatis jika tidak ada tabel
  //   await Users.sync({ alter: true });//dimatikan agar tidak mengerate table setiap kali servernya direstart
} catch (error) {
  console.error(error);
}

// agar kita dapat menerima data dalam format json
app.use(express.json());

// middleware
app.use(router);
app.listen(5000, () => console.log('Server running at port 5000'));
