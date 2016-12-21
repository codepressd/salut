import axios from 'axios';

export function addProductToCart(data){
	
	return dispatch =>{

		return axios.post('/api/addToCart', data);
	}
}