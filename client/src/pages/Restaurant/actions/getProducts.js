import axios from 'axios';

export function getProducts(){
	
	return dispatch =>{

		return axios.get('/api/getProducts/');
	}
}