/* eslint-disable */
import React, { PropTypes } from 'react';
import { Container, Grid, Image, Table, Header, Rating, Button, Loader } from 'semantic-ui-react';
import {connect} from 'react-redux';
import{bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';

//Grab Helpers

import {suppliersProducts, calculateCartTotal} from '../../../components/helpers'; //sort suppliers products

import  '../supplier.css';

class SupplierOneOrder extends React.Component{
	constructor(props){
		super(props);
	}

	render(){

		const {user, order} = this.props;
		let suppliersProduct = suppliersProducts(order, user.id);
		const itemsOrdered = suppliersProduct.products.length;
		
		
		return(
			<Table.Row>
			          <Table.Cell>
			            {order.orderNumber}
			          </Table.Cell>
			          <Table.Cell singleLine textAlign='center'>{itemsOrdered}</Table.Cell>
			          <Table.Cell textAlign='center'>
			            {order.orderDate}
			          </Table.Cell>
			          <Table.Cell textAlign='center'>
			            ${suppliersProduct.totalPrice.total}
			          </Table.Cell>
			          <Table.Cell textAlign='center'>
			          <Button color='blue' onClick={()=> browserHistory.push('/'+user.role+'/dashboard/'+user.id+'/vieworder/'+ order.orderNumber)}>View Order</Button>
			          </Table.Cell>
			</Table.Row>
		
		)
	}

}
function mapStateToProps(state){
	return{
		user: state.ActiveUser.user
	}
}


export default connect(mapStateToProps) (SupplierOneOrder);