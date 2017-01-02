/* eslint-disable */
import React, { PropTypes } from 'react';
import { Container, Grid} from 'semantic-ui-react';
import {connect} from 'react-redux';
import{bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';


import  '../supplier.css';

class ProductOrder extends React.Component{
	constructor(props){

		super(props);
	this.productTotal = this.productTotal.bind(this);
	}

	productTotal(price, quantity){
		return price * quantity;
	}

	render(){

		const {user, product} = this.props;
		const productSubTotal = this.productTotal(product.price, product.quantity);
		return(
			<Grid celled='internally'>
			<Grid.Row>
				<Grid.Column width={8}>
				      <h4>{product.title}</h4>
				</Grid.Column>
				<Grid.Column  width={2}>
					<h4>Size: {product.size}</h4>
				</Grid.Column>
				<Grid.Column  width={2}>
				      <h4>Quantity: {product.quantity}</h4>
				</Grid.Column>
				<Grid.Column  width={2}>
				      <h4>Price: ${product.price}</h4>
				</Grid.Column>
				<Grid.Column  width={2}>
				      <h4>Total: ${productSubTotal}</h4>
				</Grid.Column>		  
			</Grid.Row>
			</Grid>
		
		)
	}

}
function mapStateToProps(state){

	return{
		user: state.ActiveUser.user
	}
}


export default connect(mapStateToProps) (ProductOrder);