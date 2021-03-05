import mongoose from 'mongoose';

const DBconnect = () => {
	mongoose.connect(
		process.env.MONGOURI,
		{ useNewUrlParser: true, useUnifiedTopology: true },
		() => {
			console.log('MogoDB is connected!');
		}
	);
};

export default DBconnect;
