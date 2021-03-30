import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

function EditProfile({
	history,
	profile: { profile, loading },
	createProfile,
}) {
	const [formFields, setFormFields] = useState({
		status: '',
		company: '',
		website: '',
		location: '',
		bio: '',
		github: '',
		youtube: '',
		twitter: '',
		facebook: '',
		linkedin: '',
		instagram: '',
	});
	useEffect(() => {
		setFormFields({ ...profile, ...profile.social });
	}, [profile]);
	const handelChange = e => {
		setFormFields({ ...formFields, [e.target.name]: e.target.value });
	};
	const submit = e => {
		e.preventDefault();
		createProfile(formFields);
		history.push(`/profile/${profile.user._id}`);
	};
	return (
		<>
			<form
				className='profile-form'
				onSubmit={e => {
					submit(e);
				}}
			>
				<input
					type='text'
					name='status'
					autoComplete='off'
					placeholder='Your status'
					value={formFields.status}
					onChange={e => {
						handelChange(e);
					}}
				/>
				<input
					type='text'
					name='company'
					autoComplete='off'
					placeholder='Your workplace'
					value={formFields.company}
					onChange={e => {
						handelChange(e);
					}}
				/>
				<input
					type='text'
					name='website'
					autoComplete='off'
					placeholder='Your website'
					value={formFields.website}
					onChange={e => {
						handelChange(e);
					}}
				/>
				<input
					type='text'
					name='location'
					autoComplete='off'
					placeholder='Your location'
					value={formFields.location}
					onChange={e => {
						handelChange(e);
					}}
				/>
				<input
					type='text'
					name='bio'
					autoComplete='off'
					placeholder='Bio'
					value={formFields.bio}
					onChange={e => {
						handelChange(e);
					}}
				/>
				<label>Social media links:</label>
				<input
					type='text'
					name='github'
					autoComplete='off'
					placeholder='Github'
					value={formFields.github}
					onChange={e => {
						handelChange(e);
					}}
				/>
				<input
					type='text'
					name='youtube'
					autoComplete='off'
					placeholder='Youtube'
					value={formFields.youtube}
					onChange={e => {
						handelChange(e);
					}}
				/>
				<input
					type='text'
					name='twitter'
					autoComplete='off'
					placeholder='Twitter'
					value={formFields.twitter}
					onChange={e => {
						handelChange(e);
					}}
				/>
				<input
					type='text'
					name='facebook'
					autoComplete='off'
					placeholder='Facebook'
					value={formFields.facebook}
					onChange={e => {
						handelChange(e);
					}}
				/>
				<input
					type='text'
					name='linkedin'
					autoComplete='off'
					placeholder='Linkedin'
					value={formFields.linkedin}
					onChange={e => {
						handelChange(e);
					}}
				/>
				<input
					type='text'
					name='instagram'
					autoComplete='off'
					placeholder='Instagram'
					value={formFields.instagram}
					onChange={e => {
						handelChange(e);
					}}
				/>
				<button type='submit'>Submit</button>
			</form>
		</>
	);
}

EditProfile.propTypes = {
	profile: PropTypes.object,
	createProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { createProfile })(EditProfile);
