import axios from 'axios';

export function deleteProductFromCart(data){
	
	return dispatch =>{

		return axios.put('/api/deleteProductFromCart', data);
	}
}