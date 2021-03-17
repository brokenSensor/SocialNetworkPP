import { Router } from 'express';
import { check, validationResult } from 'express-validator';
import ProtectedRoute from '../../middleware/auth.js';
import Profile from '../../models/Profile.js';
import User from '../../models/User.js';
import Post from '../../models/Post.js';

const router = Router();

// @route   POST api/posts/create
// @desc    Create post
// @access  Privet
router.post(
	'/create',
	[check('text', 'Must not be empty post').not().isEmpty(), ProtectedRoute],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const newPost = new Post({
			user: req.user._id,
			name: req.user.username,
			text: req.body.text,
			avatar: req.user.avatar,
		});

		try {
			await newPost.save();
			return res.json(newPost);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server error');
		}
	}
);

export default router;
