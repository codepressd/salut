/* eslint-disable */
import React, { PropTypes } from 'react';
import { Container, Grid, Image, Table, Header, Rating, Button } from 'semantic-ui-react';
import {connect} from 'react-redux';
import{bindActionCreators} from 'redux';

import SideMenu from '../components/sideMenu';
import  '../restaurant.css';

//actions to get orders and update state

import {getRestaurantsOrders } from '../actions/getRestaurantsOrders'; //call to database
import {addOrdersToStore} from '../../../components/actions/productActions';


class Orders extends React.Component{
	constructor(props){
		super(props);
	}

	componentWillMount(){
		const {user} = this.props;

		this.props.getRestaurantsOrders(user.id)
		.then((res) =>{
			this.props.addOrdersToStore(res.data.orders);
		})
		.catch();
	}

	// componentWillUnmount(){
	// 	this.props.resetFetch();
	// }

	render(){
		const {user} = this.props;
		return(
			<div className='pageWrap'>
				<div className='navWrap'>
					<SideMenu {...this.props}/>
				</div>
				<div className='contentWrap'>
					<Container>
					<h2>{user.companyName} : Orders</h2>
						<Table celled padded>
						      <Table.Header>
						        <Table.Row>
						          <Table.HeaderCell >Products</Table.HeaderCell>
						          <Table.HeaderCell textAlign='center'># of Items</Table.HeaderCell>
						          <Table.HeaderCell textAlign='center'>Date</Table.HeaderCell>
						          <Table.HeaderCell textAlign='center'>Total</Table.HeaderCell>
						          <Table.HeaderCell textAlign='center'>Order Details</Table.HeaderCell>
						        </Table.Row>
						      </Table.Header>

						      <Table.Body>
						        <Table.Row>
						          <Table.Cell>
						            Creatine supplementation is the reference compound for increasing muscular creatine levels; there is
						            variability in this increase, however, with some nonresponders.
						          </Table.Cell>
						          <Table.Cell singleLine textAlign='center'>4</Table.Cell>
						          <Table.Cell>
						            12/26/16
						          </Table.Cell>
						          <Table.Cell textAlign='center'>
						            $1000.00
						          </Table.Cell>
						          <Table.Cell textAlign='center'>
						          <Button >View Order</Button>
						          </Table.Cell>
						        </Table.Row>
						        
						      </Table.Body>
						    </Table>
					</Container>
				</div>
			</div>

		)
	}

}
function mapStateToProps(state){
	return{
		user: state.ActiveUser.user,
		orders: state.Products.Orders
	}
}

function mapDispatchToProps(dispatch){
	return{
		getRestaurantsOrders: bindActionCreators(getRestaurantsOrders, dispatch),
		addOrdersToStore: bindActionCreators(addOrdersToStore, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps) (Orders);