import axios from 'axios';

export function getSupplierProducts(data){
	
	return dispatch =>{

		return axios.get('/api/getSupplierProducts', data);
	}
}