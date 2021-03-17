import { Router } from 'express';
import { check, validationResult } from 'express-validator';
import ProtectedRoute from '../../middleware/auth.js';
import Profile from '../../models/Profile.js';
import User from '../../models/User.js';

const router = Router();

// @route   POST api/profile/create
// @desc    Create or update profile
// @access  Privet
router.post(
	'/create',
	[check('status', 'Status is required').not().isEmpty(), ProtectedRoute],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const {
			company,
			website,
			location,
			status,
			bio,
			github,
			youtube,
			twitter,
			facebook,
			linkedin,
			instagram,
		} = req.body;

		let profileFields = {};
		profileFields.user = req.user.id;
		if (company) profileFields.company = company;
		if (website) profileFields.website = website;
		if (location) profileFields.location = location;
		if (status) profileFields.status = status;
		if (bio) profileFields.bio = bio;
		profileFields.social = {};
		if (github) profileFields.social.github = github;
		if (youtube) profileFields.social.youtube = youtube;
		if (twitter) profileFields.social.twitter = twitter;
		if (facebook) profileFields.social.facebook = facebook;
		if (linkedin) profileFields.social.linkedin = linkedin;
		if (instagram) profileFields.social.instagram = instagram;

		try {
			let profile = await Profile.findOne({ user: req.user.id });
			// Update profile
			if (profile) {
				profile = await Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				);
				return res.json(profile);
			}
			profile = new Profile(profileFields);
			await profile.save();
			return res.json(profile);
		} catch (error) {
			console.error(error);
			res.status(500).send('Server error');
		}
	}
);

// @route   GET api/profile/me
// @desc    Get my profile
// @access  Privet
router.get('/me', ProtectedRoute, async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.user.id,
		}).populate('user', ['username', 'avatar']);

		res.json(profile);
	} catch (error) {
		console.error(error);
		res.status(500).send('Server Error');
	}
});

// @route   GET api/profile/
// @desc    Get all profiles
// @access  Privet
router.get('/', ProtectedRoute, async (req, res) => {
	try {
		const profiles = await Profile.find().populate('user', [
			'username',
			'avatar',
		]);

		res.json(profiles);
	} catch (error) {
		console.error(error);
		res.status(500).send('Server Error');
	}
});

// @route   DELETE api/profile/
// @desc    Delete profile, user and posts
// @access  Privet
router.delete('/', ProtectedRoute, async (req, res) => {
	//Delete posts to do
	try {
		await Profile.deleteOne({ user: req.user.id });
		await User.deleteOne({ _id: req.user.id });
		req.logOut();
		res.json({ msg: 'User deleted' });
	} catch (error) {
		console.error(error);
		res.status(500).send('Server error');
	}
});
// @route   PUT api/profile/
// @desc    Add education
// @access  Privet
router.put(
	'/education',
	[
		check('school', 'School is reqired').not().isEmpty(),
		check('degree', 'Degree is reqired').not().isEmpty(),
		check('fieldofstudy', 'Field of Study is reqired').not().isEmpty(),
		check('from', 'From date is reqired').not().isEmpty(),
		ProtectedRoute,
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description,
		} = req.body;

		const newEdu = {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description,
		};

		try {
			let profile = await Profile.findOne({ user: req.user.id });

			profile.education.unshift(newEdu);

			await profile.save();

			return res.json(profile);
		} catch (error) {
			console.error(error);
			res.status(500).send('Server error');
		}
	}
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education by id
// @access  Privet
router.delete('/education/:edu_id', ProtectedRoute, async (req, res) => {
	const edu_id = req.params.edu_id;

	try {
		let profile = await Profile.findOne({ user: req.user.id });

		profile.education = profile.education.filter(edu => {
			if (edu._id == edu_id) {
				return false;
			} else {
				return true;
			}
		});

		await profile.save();

		res.json(profile);
	} catch (error) {
		console.error(error);
		res.status(500).send('Server error');
	}
});

// @route   GET api/profile/:user_id
// @desc    Get profile by user id
// @access  Privet
router.get('/:user_id', ProtectedRoute, async (req, res) => {
	const user_id = req.params.user_id;

	try {
		const profile = await Profile.findOne({ user: user_id }).populate('user', [
			'username',
			'avatar',
		]);

		if (profile) {
			return res.json(profile);
		} else {
			return res.status(400).json({ msg: 'Profile not found' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).send('Server error');
	}
});

export default router;
