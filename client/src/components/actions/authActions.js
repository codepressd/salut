export const AUTHORIZE_USER = 'AUTHORIZE_USER';
//export const AUTHORIZE_ERROR = 'AUTHORIZE_ERROR';
export const AUTHORIZE_USER_UPDATE = 'AUTHORIZE_USER_UPDATE';
export const USER_LOGOUT = 'USER_LOGOUT';
import {browserHistory} from 'react-router';

export const authorizeUser = (user, token) => ({

	type: AUTHORIZE_USER,
	user,
	token
});
// export const authorizeUser = (user, token) => {
	
// 	return dispatch =>{
// 		browserHistory.push('/' + user.role + '/dashboard/' + user.id);
// 		return dispatch({
// 			type: AUTHORIZE_USER,
// 			user,
// 			token
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

