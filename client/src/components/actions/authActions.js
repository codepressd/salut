/* eslint-disable */
import axios from 'axios';
import {browserHistory} from 'react-router';

export const AUTHORIZE_USER = 'AUTHORIZE_USER';
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL';
export const USER_SIGNUP_FAIL = 'USER_SIGNUP_FAIL';
//export const AUTHORIZE_ERROR = 'AUTHORIZE_ERROR';
export const AUTHORIZE_USER_UPDATE = 'AUTHORIZE_USER_UPDATE';
export const CHANGE_PASSWORD_ERROR = 'CHANGE_PASSWORD_ERROR';

//User Navigation Actions
export const USER_LOGOUT = 'USER_LOGOUT';
export const TOGGLE_USER_MENU= 'TOGGLE_USER_MENU';

//Token Actions
export const USER_TOKEN_SUCCESS = 'USER_TOKEN_SUCCESS';
export const USER_RESET_FETCH = 'USER_RESET_FETCH';
export const USER_TOKEN_FAIL = 'USER_TOKEN_FAIL';
export const NO_TOKEN_FAIL = 'NO_TOKEN_FAIL';
export const NOT_AUTHORIZED = 'NOT_AUTHORIZED';



export const authorizeUser = (user, token, success) => {
	return {
		type: AUTHORIZE_USER,
		user,
		token, 
		success
	}
};

export const userLoginFail = (error) => {
	return {
		type: USER_LOGIN_FAIL,
		error
	}
};

export const userSignupFail = (error) => {
	return {
		type: USER_SIGNUP_FAIL,
		error
	}
};

export const userTokenSuccess = (user, token, success) => {
	return {
		type: USER_TOKEN_SUCCESS,
		user,
		token,
		success
	}
};

 export const userTokenFail = (expireTime, message, success) => {

	return {
		type: USER_TOKEN_FAIL,
		expireTime,
		success,
		message
	}
};

export const noTokenFail = ( message, success) => {

	return {
		type: NO_TOKEN_FAIL,
		success,
		message
	}
};

export const notAuthorized = ( message, success) => {

	return {
		type: NOT_AUTHORIZED,
		success,
		message
	}
};



export const userResetFetch = () => {
	
	return{	
		type:USER_RESET_FETCH,
	}
}

//user Token

export const checkUserToken = (data) => dispatch => {

	return axios.post('/api/checkUserToken', data)
		.then( res => {
			
			const { _id, companyName, email, firstName, lastName, role, address, city, state } = res.data.user;
		
		                    const {token, success }= res.data;
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

		                    dispatch(userTokenSuccess(activeUser, token, success));

		})
		.catch((err) =>{
			const {expireTime, message, success, token} = err.response.data;
			if(expireTime && !success && message){
				dispatch(userTokenFail(expireTime, message, success));
				browserHistory.push('/login');
			}else if(!success && message){
				dispatch(noTokenFail(message, success));
				browserHistory.push('/login');
			}
			
		});
}

//signup

export const signupRequest = (data) => dispatch => {

	return axios.post('/api/signup', data)
		.then( res => {

			 const { _id, companyName, email, firstName, lastName, role, address, city, state } = res.data.user;
		                    const {token, success} = res.data;
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
		                   
			dispatch(authorizeUser(activeUser, token, success));
			return browserHistory.push('/' + activeUser.role + '/dashboard/' + activeUser.id);
		})
		.catch((err) => {
			dispatch(userSignupFail(err.response.data));
		});
	
}

//new login request

export const loginRequest = (data) => dispatch => {

	return axios.post('/api/login', data)
		.then( res =>{

			  const { _id, companyName, email, firstName, lastName, role, address, city, state } = res.data.user;
		                    const {token, success }= res.data;
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
		                   
			dispatch(authorizeUser(activeUser, token, success));
			return browserHistory.push('/' + activeUser.role + '/dashboard/' + activeUser.id);
		})
		.catch((err) => {
			dispatch(userLoginFail(err.response.data));
		});
}

export const updateUserData = (data) => dispatch => {

	return axios.post('/api/updateUser', data)
		.then( res => {

			  const {_id, companyName, email, firstName, lastName, role, address, city, state } = res.data.user;
		                    const {token, success} = res.data;
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

		                    dispatch(authorizeUser(updatedUserInfo, token, success));
		                   return browserHistory.push('/supplier/dashboard/'+updatedUserInfo.id+'/updateSuccess');
		})
		.catch(err => console.log(err));
}

export const changePassword = (data) => dispatch => {

	return axios.post('/api/changePassword', data)
		.then( res => {

			 const {_id, companyName, email, firstName, lastName, role, address, city, state } = res.data.user;
		                    const {token, success }= res.data;
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

		                    dispatch(authorizeUser(updatedUserInfo, token, success));
		                    return browserHistory.push('/supplier/dashboard/'+updatedUserInfo.id+'/updateSuccess');
		})
		.catch((err)=> {

			dispatch(changePasswordError(err.response.data));
		});
}

export const changePasswordError = (error) =>({

		type: CHANGE_PASSWORD_ERROR,
		error
	
});	

export const authorizeUserUpdate = (user) => ({

	type: AUTHORIZE_USER_UPDATE,
	user
});

export const toggleUserMenu = (toggle) => ({
	type: TOGGLE_USER_MENU,
	toggle
})

export const logoutUser = () => {

	return dispatch => {
    	browserHistory.push('/');
    		return dispatch({ type: USER_LOGOUT });
  } 
	
};

