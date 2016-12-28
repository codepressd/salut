import axios from 'axios';

export function getRestaurantsOrders(data){
	
	return dispatch =>{

		return axios.get('/api/getRestOrders/'+data);
	}
}