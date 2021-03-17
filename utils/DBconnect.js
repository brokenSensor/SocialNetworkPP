import mongoose from 'mongoose';

const DBconnect = () => {
	mongoose.connect(
		process.env.MONGOURI,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		},
		() => {
			console.log('MongoDB is connected!');
		}
	);
};

export default DBconnect;
