import { Router } from 'express';
import { check, validationResult } from 'express-validator';
import gravatar from 'gravatar';
import bcrypt from 'bcrypt';
import User from '../../models/User.js';
import passport from 'passport';

const router = Router();

// @route   POST api/auth
// @desc    Create user
// @access  Public
router.post(
	'/',
	[
		check('username', 'User name is required').not().isEmpty(),
		check('email', 'Email must be valid').isEmail(),
		check('password', 'Password must be at least 6 characters long').isLength({
			min: 6,
		}),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { username, email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'User already exist' }] });
			}

			const avatar = gravatar.url(email, {
				s: '200',
				r: 'pg',
				d: 'mm',
			});

			user = new User({
				username,
				email,
				password,
				avatar,
			});

			user.password = await bcrypt.hash(password, 10);

			await user.save();

			return res.json(user);
		} catch (errore) {
			console.error(error.message);
			res.status(500).send('Server error');
		}
	}
);

// @route   GET api/auth
// @desc    Authenticate user
// @access  Public
router.get('/', (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		console.log(user, info);
		req.logIn(user, err => {
			return res.json(req);
		});
	});
});

export default router;
