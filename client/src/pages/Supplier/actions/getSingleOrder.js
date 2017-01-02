import axios from 'axios';

export function getSingleOrder(data){
	
	return dispatch =>{

		return axios.get('/api/getSingleOrder/'+data);
	}
}