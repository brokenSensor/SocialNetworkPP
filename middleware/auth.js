export default (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.status(401).json({ msg: 'Not authorized' });
	}
};
