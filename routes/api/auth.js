import { Router } from 'express';
import { check, validationResult } from 'express-validator';
import gravatar from 'gravatar';
import bcryptjs from 'bcryptjs';
import User from '../../models/User.js';

const router = Router();

// @route   POST api/auth
// @desc    Create user
// @access  Public
router.post(
	'/',
	[
		check('name', 'User name is required').not().isEmpty(),
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

		[username, email, password] = res.body;

		try {
			const user = await User.findOne({ email });

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

			const salt = await bcryptjs.genSalt(10);

			user.password = await bcryptjs.hash(password, salt);

			await user.save();
		} catch (errore) {
			console.error(error.message);
			res.status(500).send('Server error');
		}
	}
);
