import axios from 'axios';

export function getSupplierOrders(data){
	
	return dispatch =>{

		return axios.get('/api/getSupplierOrders/'+data);
	}
}