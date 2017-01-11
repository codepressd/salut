/* eslint-disable */
import React, { PropTypes } from 'react';
import { Container, Grid, Image, Loader, Divider, Form, Button, Item, Icon , Segment, Sidebar} from 'semantic-ui-react';
import {connect} from 'react-redux';
import{bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import classnames from 'classnames';

//Send Orders
import {sendOrders} from '../actions/sendOrder';//post Orders to database
import {addToCart, resetCart} from '../../../components/actions/productActions';//update store, reset cart

//Reset Fetching State
import {resetFetch} from '../../../components/actions/productActions';//reset fetching

//import user Actions
import {checkUserToken, userResetFetch} from '../../../components/actions/authActions';//update user state

//import product template
import CheckoutOneProduct  from '../components/checkoutOneProduct';

//Import Mobile Menu
import MobileMenu from '../../../components/mobileMenu';

//helpers
import {calculateCartTotal, sortCart} from '../../../components/helpers';


import SideMenu from '../components/sideMenu';
import  '../restaurant.css';

//Case or Single

const type = [
  { text: '', value: '' },
  { text: 'Single', value: 'single' },
  { text: 'Case', value: 'case' },
]

const quantity = [
  { text: '', value: '' },
  { text: '1', value: 1 },
  { text: '2', value: 2},
  { text: '3', value: 3 },
  { text: '4', value: 4},
  { text: '5', value: 5 },
  { text: '6', value: 6},
  { text: '7', value: 7 },
  { text: '8', value: 8},
]

class CheckoutPage extends React.Component{

	constructor(props){
		super(props);

		this.state={
			errors: {}
		}
		
	}

	componentWillMount() {
		const userId = this.props.activeUser.user.id;
		const{ token } = this.props.activeUser;
		const userInfo = {
			token,
			userId
		}
		this.props.checkUserToken(userInfo);
	}

	componentWillUnmount(){
		this.props.userResetFetch();
		this.props.resetFetch();
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
		const {user, cart} = this.props;
		const isLoading = this.props.isFetching;
		const { errors } = this.state;
		const cartTotals = calculateCartTotal(this.props.cart);
		const {success, userIsFetching} = this.props.activeUser;
		
		if(isLoading || !success){
		          return(
		          <Loader active inline='centered' />
		          )
		}else if(success){

		return(
		<Sidebar.Pushable as={Segment}>
		        <MobileMenu  {...this.props}/>
		        <Sidebar.Pusher>
                  		<Segment basic>
			<div className='pageWrap'>
				<Container>
				<h2>Checkout</h2>
					<Grid stackable>
						<Grid.Row>
						<Grid.Column width={10}>
						<Item.Group>
						   {cart.map((product, index) => <CheckoutOneProduct key={index} index={index} product={product} /> )}
						    </Item.Group>
						      </Grid.Column>
						      <Grid.Column  width={6}>
						        <div className='checkout-sidebar'>
						        	<div className='sidebar-content'>
							        <h3>Order Summary</h3>
							        <Divider />
							        <Grid>
								    <Grid.Column floated='left' width={3}>
								     <h4>SubTotal:</h4>
								    </Grid.Column>
								    <Grid.Column floated='right' width={7}>
								      <h4>$ {cartTotals.subTotal}</h4>
								    </Grid.Column>
							        </Grid>
							        <Grid>
								    <Grid.Column floated='left' width={3}>
								     <h4>Tax:</h4>
								    </Grid.Column>
								    <Grid.Column floated='right' width={7}>
								      <h4>$ {cartTotals.tax}</h4>
								    </Grid.Column>
							        </Grid>
							        <Divider />
							        <Grid>
								    <Grid.Column floated='left' width={3}>
								     <h4>Total:</h4>
								    </Grid.Column>
								    <Grid.Column floated='right' width={7}>
								      <h4>$ {cartTotals.total}</h4>
								    </Grid.Column>
							        </Grid>
							        <Button fluid onClick={this.sendOrder.bind(this)} className='checkout-button'>Send Order</Button>
						        	</div>
						        </div>
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
		cart: state.ActiveUser.cart
	}
}

function mapDispatchToProps(dispatch){
	return{
		sendOrders: bindActionCreators(sendOrders, dispatch),
		resetCart: bindActionCreators(resetCart, dispatch),
		resetFetch: bindActionCreators(resetFetch, dispatch),
		checkUserToken: bindActionCreators(checkUserToken, dispatch),
		userResetFetch: bindActionCreators(userResetFetch, dispatch)

	}
}

export default connect(mapStateToProps, mapDispatchToProps) (CheckoutPage);