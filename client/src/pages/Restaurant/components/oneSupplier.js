/* eslint-disable */
import React, { PropTypes } from 'react';
import { Container, Grid, Image, Table, Header, Rating, Button, Loader } from 'semantic-ui-react';
import {connect} from 'react-redux';
import{bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';

//import OneSupplier template

import ProductOrder  from './productOrder';

import  '../restaurant.css';

class OneSupplier extends React.Component{
	constructor(props){
		super(props);
	}

	render(){

		const {user, supplier} = this.props;
		const supplierName = Object.keys(supplier);
		const productsOrdered = supplier[supplierName];
		
		return(
			<Grid celled='internally' stackable>

				<Grid.Row>
				<h3>{supplierName}</h3>
				</Grid.Row>
				{productsOrdered.map((product, index) => <ProductOrder key={index} index={index} product={product} /> )}
			
			</Grid>
		
		)
	}

}
function mapStateToProps(state){
	return{
		user: state.ActiveUser.user
	}
}


export default connect(mapStateToProps) (OneSupplier);