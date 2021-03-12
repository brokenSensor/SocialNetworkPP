import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import mongoose from 'mongoose';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

export default passport => {
	passport.use(
		new LocalStrategy(
			{ usernameField: 'email', passwordField: 'password' },
			async (email, password, done) => {
				try {
					const user = await User.findOne({ email });
					if (!user) {
						return done(null, false, {
							message: 'Incorrect email or password',
						});
					}

					if (await bcrypt.compare(password, user.password)) {
						return done(null, user);
					} else {
						return done(null, false, {
							message: 'Incorrect email or password',
						});
					}
				} catch (error) {
					return done(error);
				}
			}
		)
	);

	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: '/api/auth/google/callback',
			},
			async (accessToken, refreshToken, profile, done) => {
				const newUser = {
					providerId: profile.id,
					provider: profile.provider,
					username: profile.displayName,
					avatar: profile.photos[0].value,
				};

				try {
					let user = await User.findOne({
						provider: profile.provider,
						providerId: profile.id,
					});
					if (user) {
						done(null, user);
					} else {
						user = await User.create(newUser);
						done(null, user);
					}
				} catch (error) {
					console.log(error);
				}
			}
		)
	);

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});
};
