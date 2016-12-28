/* eslint-disable */
import React, { PropTypes } from 'react';
import { Container, Grid, Image, Table, Header, Rating, Button, Loader } from 'semantic-ui-react';
import {connect} from 'react-redux';
import{bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';


import  '../restaurant.css';

class OneOrder extends React.Component{
	constructor(props){
		super(props);
	}

	render(){

		const {user, order} = this.props;
		const itemsOrdered = order.products.length;
		return(
			<Table.Row>
			          <Table.Cell>
			            {order.orderNumber}
			          </Table.Cell>
			          <Table.Cell singleLine textAlign='center'>{itemsOrdered}</Table.Cell>
			          <Table.Cell>
			            {order.orderDate}
			          </Table.Cell>
			          <Table.Cell textAlign='center'>
			            ${order.orderTotal.total}
			          </Table.Cell>
			          <Table.Cell textAlign='center'>
			          <Button onClick={()=> browserHistory.push('/restaurant/dashboard/'+user.id+'/vieworder/'+ order.orderNumber)}>View Order</Button>
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


export default connect(mapStateToProps) (OneOrder);