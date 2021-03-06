import express from 'express';
import DBconnect from './utils/DBconnect.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

DBconnect();

app.use(express.json({ extended: false }));

//Routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
