import { Router } from 'express';
import { check, validationResult } from 'express-validator';
import gravatar from 'gravatar';
import bcrypt from 'bcrypt';
import User from '../../models/User.js';
import passport from 'passport';
import ProtectedRoute from '../../middleware/auth.js';

const router = Router();

// @route   POST api/auth/create
// @desc    Create user
// @access  Public
router.post(
	'/create',
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
				provider: 'local',
			});

			user.password = await bcrypt.hash(password, 10);

			await user.save();

			req.logIn(user, err => {
				if (err) {
					return res.status(400).json({ errors: err });
				}
				return res.json(user);
			});
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server error');
		}
	}
);

// @route   POST api/auth/local
// @desc    Authenticate user localy
// @access  Public
router.post('/local', (req, res) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			return res.status(400).json({ errors: err });
		}
		if (info) {
			return res.status(400).json({ errors: info });
		}
		req.logIn(user, err => {
			if (err) {
				return res.status(400).json({ errors: err });
			}
			return res.json(user);
		});
	})(req, res);
});

// @route   GET api/auth/google
// @desc    Authenticate with Google
// @access  Public
router.get(
	'/google',
	passport.authenticate('google', {
		failureRedirect: '/login',
		scope: ['profile'],
	})
);

// @route   GET api/auth/google/callback
// @desc    Google auth callback
// @access  Public
router.get(
	'/google/callback',
	passport.authenticate('google', { failureRedirect: '/login' }),
	(req, res) => {
		return res.json(req.user);
	}
);

// @route   GET api/auth/logout
// @desc    Logout
// @access  Public
router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

// @route   GET api/auth/
// @desc    Get auth user
// @access  Privet
router.get('/', ProtectedRoute, (req, res) => {
	return res.json(req.user);
});

export default router;
