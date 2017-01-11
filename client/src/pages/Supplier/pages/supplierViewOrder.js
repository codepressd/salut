/* eslint-disable */
import React, { PropTypes } from 'react';
import { Container, Grid, Image, Loader, Divider, Form, Button, Item, Icon, Segment, Sidebar } from 'semantic-ui-react';
import {connect} from 'react-redux';
import{bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import classnames from 'classnames';

//Send Orders

import {getSingleOrder} from '../actions/getSingleOrder';//get single order from database
import {singleOrderToStore} from '../../../components/actions/productActions';//update store with single order

//Reset Fetching State

import {resetFetch} from '../../../components/actions/productActions';//reset fetching

//grab helpers
import {suppliersProducts} from '../../../components/helpers'; //sort suppliers products


//import product Order template
import ProductOrder  from '../components/productOrder';

//Import Mobile Menu
import MobileMenu from '../../../components/mobileMenu';

import SideMenu from '../components/SupplierMenu';
import  '../supplier.css';


class ViewOrder extends React.Component{

	constructor(props){
		super(props);

		this.state={
			errors: {}
		}
	
		
	}

	componentWillMount() {
		const {ordernumber} = this.props.params;

	                  this.props.getSingleOrder(ordernumber)
	                 .then((res) => {

	                		const order = res.data;
	                		this.props.singleOrderToStore(order);

	            	})
	        	.catch((err) => this.setState({ errors: err }));
	}

	componentWillUnmount(){
		this.props.resetFetch();
	}


	render(){
		const {user, order} = this.props;
		const isLoading = this.props.isFetching;
		const { errors } = this.state;

		if(isLoading){
		          return(
		          <Loader active inline='centered' />
		          )
		}else{
			
			const products = suppliersProducts(order, user.id);
			
		return(
		<Sidebar.Pushable as={Segment}>
		        <MobileMenu  {...this.props}/>
		        <Sidebar.Pusher>
                  		<Segment basic>

			<div className='pageWrap'>
			
				<Container>
				<h2>Order #: {order.orderNumber}</h2>
					<Grid >
						<Grid.Row>
						<Grid.Column width={16}>
							<div className='invoice-header'>
								<Grid columns ={3} divided stackable>
								    <Grid.Column >
								     <h3>Order Date:</h3>
								     <Divider />
								      <h2>{order.orderDate}</h2>
								    </Grid.Column>
								    <Grid.Column >
								     <h3>Number Of  Items Ordered: </h3>
								     <Divider />
								     <h2>{products.products.length}</h2>
								    </Grid.Column>
								    <Grid.Column >
								    <h3>Order Total :</h3>
								    <Divider />
								    <h2> ${products.totalPrice.total}</h2>
								    </Grid.Column>
							        </Grid>
							</div>
						</Grid.Column>
						</Grid.Row>
						</Grid>
							<h2>Products Ordered:</h2>
							{products.products.map((product, index) => <ProductOrder key={index} index={index} product={product} /> )}
						<Divider />
						<Grid >
							<Grid.Row className='align-right'>
								<Grid.Column width={6}>
								     
								</Grid.Column>				
								<Grid.Column  width={5}>
									<h4>Subtotal: </h4>
									<Divider hidden />
									<h4>Tax: </h4>
									<Divider hidden />
									<h4>Total: </h4>
								</Grid.Column>
								<Grid.Column  width={5}>
									<h4>$ {products.totalPrice.subTotal}</h4>
									<Divider hidden />
									<h4>$ {products.totalPrice.tax}</h4>
									<Divider  />
								     	 <h4>$ {products.totalPrice.total}</h4>
								</Grid.Column>		  
							</Grid.Row>
							
						</Grid>
				</Container>
			</div>
			  </Segment>
		        </Sidebar.Pusher>
		</Sidebar.Pushable>

		)}
		
	}

}

function mapStateToProps(state){
	return{
		user: state.ActiveUser.user,
		order: state.Products.Order,
		isFetching: state.Products.isFetching
	}
}

function mapDispatchToProps(dispatch){
	return{
		getSingleOrder: bindActionCreators(getSingleOrder, dispatch),
		singleOrderToStore: bindActionCreators(singleOrderToStore, dispatch),
		resetFetch: bindActionCreators(resetFetch, dispatch)

	}
}

export default connect(mapStateToProps, mapDispatchToProps) (ViewOrder);