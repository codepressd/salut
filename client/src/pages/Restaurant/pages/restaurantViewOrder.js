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

//import user Actions
import {checkUserToken, userResetFetch} from '../../../components/actions/authActions';//update user state

//import OneSupplier template
import OneSupplier  from '../components/oneSupplier';

//Import Mobile Menu
import MobileMenu from '../../../components/mobileMenu';

//css
import  '../restaurant.css';


class ViewOrder extends React.Component{

	constructor(props){
		super(props);

		this.state={
			errors: {}
		}
		this.sortSuppliers = this.sortSuppliers.bind(this);
		
	}

	componentWillMount() {
		const userId = this.props.activeUser.user.id;
		const{ token } = this.props.activeUser;
		const userInfo = {
			token,
			userId
		}
		this.props.checkUserToken(userInfo);
	
		const {ordernumber} = this.props.params;

	                  this.props.getSingleOrder(ordernumber)
	                 .then((res) => {

	                		const order = res.data;
	                		this.props.singleOrderToStore(order);

	            	})
	        	.catch((err) => this.setState({ errors: err }));
	}

	componentWillUnmount(){
		this.props.userResetFetch();
		this.props.resetFetch();
	}

	sortSuppliers(order){
		let supplyWrapArray =[];
		
		const{suppliers, products} = order;
		
		 
		    for (let i =0 ; i < suppliers.length; i++){
		        let suppliersProducts = {};
		        let product = products.filter(function(el){
		       	return el.supplierId === suppliers[i];
		        });
		        suppliersProducts[product[0].supplierName] = product;
		        supplyWrapArray.push(suppliersProducts);
		    }
		   
		   return supplyWrapArray;
	}


	sendOrder(){
		const {cart, user} = this.props;
		const order = sortCart(cart, user.id);
		
		this.props.sendOrders(order)
		.then((res)=>{
				this.props.resetCart();
				browserHistory.push('/restaurant/dashboard/' +user.id+'/orderSuccess');
		})
		.catch((err) => this.setState({ errors: err.response.data }));

	}

	render(){
		const {user, order} = this.props;
		const isLoading = this.props.isFetching;
		const { errors } = this.state;
		const {success, userIsFetching} = this.props.activeUser;
		
		if(isLoading || !success){
		          return(
		          <Loader active inline='centered' />
		          )
		}else if(success){
			const uniqueSuppliers = this.sortSuppliers(order);
			const cartTotals = order.orderTotal;
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
									     <h3>Number Of  Suppliers: </h3>
									     <Divider />
									     <h2>{order.suppliers.length}</h2>
									    </Grid.Column>
									    <Grid.Column >
									    <h3>Order Total :</h3>
									    <Divider />
									    <h2> ${order.orderTotal.total}</h2>
									    </Grid.Column>
								        </Grid>
								</div>
							</Grid.Column>
							</Grid.Row>
							</Grid>
								<h2>Products Ordered:</h2>
								{uniqueSuppliers.map((supplier, index) => <OneSupplier key={index} index={index} supplier={supplier} /> )}
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
										<h4>$ {cartTotals.subTotal}</h4>
										<Divider hidden />
										<h4>$ {cartTotals.tax}</h4>
										<Divider  />
									     	 <h4>$ {cartTotals.total}</h4>
									</Grid.Column>		  
								</Grid.Row>
								
							</Grid>
					</Container>
				</div>
				</Segment>
			        </Sidebar.Pusher>
			</Sidebar.Pushable>

			)}else{
				browserHistory.push('/login');
			}
		
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
		resetFetch: bindActionCreators(resetFetch, dispatch),
		checkUserToken: bindActionCreators(checkUserToken, dispatch),
		userResetFetch: bindActionCreators(userResetFetch, dispatch)

	}
}

export default connect(mapStateToProps, mapDispatchToProps) (ViewOrder);