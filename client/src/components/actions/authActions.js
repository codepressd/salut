import axios from 'axios';
import {browserHistory} from 'react-router';

export const AUTHORIZE_USER = 'AUTHORIZE_USER';
//export const AUTHORIZE_ERROR = 'AUTHORIZE_ERROR';
export const AUTHORIZE_USER_UPDATE = 'AUTHORIZE_USER_UPDATE';
export const USER_LOGOUT = 'USER_LOGOUT';



export const authorizeUser = (user, token) => {
	return {
		type: AUTHORIZE_USER,
		user,
		token
	}
};

export const signupRequest = (data) => dispatch => {

	return axios.post('/api/signup', data)
		.then( res => {

			 const { _id, companyName, email, firstName, lastName, role, address, city, state } = res.data.user;
		                    const token = res.data.token;
		                    const activeUser = {
		                        id: _id,
		                        email,
		                        firstName,
		                        lastName,
		                        companyName,
		                        role,
		                        address,
		                        city,
		                        state
		                    }
		                   
			dispatch(authorizeUser(activeUser, token));
			axios.defaults.headers.common['Authorization'] = token;
			return browserHistory.push('/' + activeUser.role + '/dashboard/' + activeUser.id);
		})
		.catch(err => console.log(err));
	
}

//new login request

export const loginRequest = (data) => dispatch => {

	return axios.post('/api/login', data)
		.then( res =>{

			  const { _id, companyName, email, firstName, lastName, role, address, city, state } = res.data.user;
		                    const token = res.data.token;
		                    const activeUser = {
		                        id: _id,
		                        email,
		                        firstName,
		                        lastName,
		                        companyName,
		                        role,
		                        address,
		                        city,
		                        state
		                    }
		                   
			dispatch(authorizeUser(activeUser, token));
			axios.defaults.headers.common['Authorization'] = token;
			return browserHistory.push('/' + activeUser.role + '/dashboard/' + activeUser.id);
		})
		.catch(err => console.log(err));
}

export const updateUserData = (data) => dispatch => {

	return axios.post('/api/updateUser', data)
		.then( res => {

			  const {_id, companyName, email, firstName, lastName, role, address, city, state } = res.data.user;
		                    const token = res.data.token;
		                    const updatedUserInfo = {
		                        id: data.userId,
		                        email,
		                        firstName,
		                        lastName,
		                        companyName,
		                        role,
		                        address,
		                        city,
		                        state
		                 
		                    }

		                    dispatch(authorizeUser(updatedUserInfo, token));
		                   
		})
		.catch(err => console.log(err));
}


export const authorizeUserUpdate = (user) => ({

	type: AUTHORIZE_USER_UPDATE,
	user
});

export const logoutUser = () => {

	return dispatch => {
    	browserHistory.push('/');
    		return dispatch({ type: USER_LOGOUT });
  } 
	
};

