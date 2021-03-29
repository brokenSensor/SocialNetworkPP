import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadProfile } from '../../actions/profile';
import { Link } from 'react-router-dom';
import './profile.sass';

function Profile({ profile: { profile, loading }, auth, loadProfile, match }) {
	useEffect(() => {
		loadProfile(match.params.id);
	}, [loadProfile, match.params.id]);

	return loading === false && profile !== null ? (
		<>
			<div className='profile_container'>
				<div className='avatar-box'>
					<img src={profile.user.avatar} alt='avatar' className='avatar' />
				</div>
			</div>
			<div className='info-box'>
				<h2 className='name'>{profile.user.username}</h2>
				<p className='status'>{profile.status}</p>
				<p className='company'>{profile.company}</p>
				<p className='location'>{profile.location}</p>
				<br />
				<p className='bio'>{profile.bio}</p>
			</div>
		</>
	) : (
		<Link className='centerd' to='/edit-profile'>
			<input className='btn' type='button' value='Create profile' />
		</Link>
	);
}

Profile.propTypes = {
	loadProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(mapStateToProps, { loadProfile })(Profile);
