import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
	provider: {
		type: String,
	},
	providerId: {
		type: String,
	},
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
	},
	password: {
		type: String,
	},
	avatar: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.model('user', UserSchema);
