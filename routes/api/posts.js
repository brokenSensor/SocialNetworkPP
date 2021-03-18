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

// @route   GET api/posts/
// @desc    Get all posts
// @access  Privet
router.get('/', ProtectedRoute, async (req, res) => {
	try {
		const posts = await Post.find();

		return res.json(posts);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server error');
	}
});

// @route   GET api/posts/:post_id
// @desc    Get post by id
// @access  Privet
router.get('/:post_id', ProtectedRoute, async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);
		if (post === null) return res.json({ msg: 'Post not found' });
		return res.json(post);
	} catch (error) {
		console.error(error);
		if (error.kind === 'ObjectId')
			return res.status(404).json({ msg: 'Post not found' });
		res.status(500).send('Server error');
	}
});

// @route   DELETE api/posts/:post_id
// @desc    Delete post by id
// @access  Privet
router.delete('/:post_id', ProtectedRoute, async (req, res) => {
	try {
		const post = await Post.findById(req.user._id);

		if (String(post?.user) === String(req.user._id)) {
			await post.remove();
			return res.json({ msg: 'Post deleted' });
		}
		return res.json({ msg: 'Post not found' });
	} catch (error) {
		console.error(error);
		if (error.kind === 'ObjectId')
			return res.status(404).json({ msg: 'Post not found' });
		res.status(500).send('Server error');
	}
});

// @route   PUT api/posts/like/:post_id
// @desc    Like/unlike post
// @access  Privet
router.put('/like/:post_id', ProtectedRoute, async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);

		if (!post) return res.json({ msg: 'Post not found' });

		const likeIndex = post.likes.findIndex(like => {
			if (String(like.user) === String(req.user.id)) {
				return true;
			}
		});

		if (likeIndex === -1) {
			post.likes.push({ user: req.user.id });
		} else {
			post.likes.splice(likeIndex, 1);
		}

		await post.save();
		return res.json(post);
	} catch (error) {
		console.error(error);
		if (error.kind === 'ObjectId')
			return res.status(404).json({ msg: 'Post not found' });
		res.status(500).send('Server error');
	}
});

// @route   POST api/posts/comment/:post_id
// @desc    Add comment to post
// @access  Privet
router.post(
	'/comment/:post_id',
	[check('text', 'Must not be empty comment').not().isEmpty(), ProtectedRoute],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const post = await Post.findById(req.params.post_id);

			if (!post) return res.json({ msg: 'Post not found' });

			post.comments.push({
				user: req.user._id,
				text: req.body.text,
				avatar: req.user.avatar,
			});

			await post.save();
			return res.json(post);
		} catch (error) {
			console.error(error);
			if (error.kind === 'ObjectId')
				return res.status(404).json({ msg: 'Post not found' });
			res.status(500).send('Server error');
		}
	}
);

export default router;
