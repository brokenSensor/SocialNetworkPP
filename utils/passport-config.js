import { Strategy as LocalStrategy } from 'passport-local';
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
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});
};
