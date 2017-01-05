export const AUTHORIZE_USER = 'AUTHORIZE_USER';
//export const AUTHORIZE_ERROR = 'AUTHORIZE_ERROR';
export const AUTHORIZE_USER_UPDATE = 'AUTHORIZE_USER_UPDATE';
export const USER_LOGOUT = 'USER_LOGOUT';
import axios from 'axios';
import {browserHistory} from 'react-router';

export const authorizeUser = (user, token) => {
	return {
		type: AUTHORIZE_USER,
		user,
		token
	}
};

export const signupRequest = (data) => dispatch => {

	return axios.post('api/signup', data)
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

	return axios.post('api/login', data)
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

// //New Signup Route

// export function signupRequest(data){
	
// 	return dispatch =>{

// 		return axios.post('api/signup', data);
// 	}
// }


// import axios from 'axios';

// export function loginRequest(data){
	
// 	return dispatch =>{

// 		return axios.post('api/login', data);
// 	}
// }


// export const authorizeUser = (user, token) => {
	
// 	return dispatch =>{
// 		browserHistory.push('/' + user.role + '/dashboard/' + user.id);
// 		return dispatch({
// 			type: AUTHORIZE_USER,
// 			user,
// 			token,
			
// 		});
// 	}
	
// };

// export const authorizeUserError = (error) => ({

// 	type: AUTHORIZE_USER_ERROR,
// 	error
// });

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

