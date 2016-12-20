import axios from 'axios';

export function getSingleProduct(data){
	
	return dispatch =>{

		return axios.get('/api/getSingleProduct/'+data);
	}
}