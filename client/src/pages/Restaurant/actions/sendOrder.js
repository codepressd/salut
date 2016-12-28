import axios from 'axios';

export function sendOrders(data){
	
	return dispatch =>{

		return axios.post('/api/sendOrders', data);
	}
}