import axios from 'axios';

export function getSupplierProducts(data){
	
	return dispatch =>{

		return axios.post('/api/getSupplierProducts', data);
	}
}