import axios from 'axios';

export function postProduct(data){
	
	return dispatch =>{

		return axios.post('/api/postProduct', data);
	}
}