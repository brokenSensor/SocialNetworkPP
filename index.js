import express from 'express';
import DBconnect from './utils/DBconnect.js';
import passport from 'passport';
import session from 'express-session';
import authRoute from './routes/api/auth.js';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

import { default as connectMongodbSession } from 'connect-mongodb-session';
const MongoDBStore = connectMongodbSession(session);

import initializePassport from './utils/passport-config.js';
initializePassport(passport);

const app = express();

DBconnect();

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		store: new MongoDBStore({
			uri: process.env.MONGOURI,
			collection: 'sessions',
		}),
	})
);

app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/api/auth', authRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
