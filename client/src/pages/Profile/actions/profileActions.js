import axios from 'axios';

export function profileUpdate(data){
	
	return dispatch =>{

		return axios.post('api/update', data);
	}
}