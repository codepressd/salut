import axios from 'axios';

export function updateProduct(data){
	
	return dispatch =>{

		return axios.post('/api/updateProduct', data);
	}
}