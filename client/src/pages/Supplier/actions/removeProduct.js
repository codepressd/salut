import axios from 'axios';

export function deleteProduct(data){
	
	return dispatch =>{

		return axios.delete('/api/removeProduct/'+data.productId);
	}
}