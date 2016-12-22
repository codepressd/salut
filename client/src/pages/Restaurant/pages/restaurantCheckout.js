import React, { PropTypes } from 'react';
import { Container, Grid, Image, Loader, Divider, Form, Button, Item, Icon } from 'semantic-ui-react';
import {connect} from 'react-redux';
import{bindActionCreators} from 'redux';
import classnames from 'classnames';

//Getting Product
import { getSingleProduct } from '../../Supplier/actions/getSingleProduct';//call to database return Single Product
import {pushSingleProduct} from '../../../components/actions/productActions';//update state with Single product

//Add to Users Cart

import {addProductToCart } from '../actions/addToCart';//call to database
import {addToCart} from '../../../components/actions/productActions';//update store

//Reset Fetching State

import {resetFetch} from '../../../components/actions/productActions';//reset fetching

//import product template

import CheckoutOneProduct  from '../components/checkoutOneProduct';


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
		this.handleSubmit = this.handleSubmit.bind(this);
		this.validateInput = this.validateInput.bind(this);
	}

	componentWillMount() {
		/*const {productId} = this.props.params;

	                  this.props.getSingleProduct(productId)
	                 .then((res) => {
	                		const { product } = res.data;
	                		this.props.pushSingleProduct(product);

	            	})
	        	.catch((err) => this.setState({ errors: err.response.data }));*/
	}

	componentWillUnmount(){
		this.props.resetFetch();
	}

	validateInput(data) {
	        let errors = {};
	       
	        if(data.type.length === 0){
	        	errors.type ='Must Pick A Type';
	        }

	        if(data.quantity.length === 0){
	        	errors.quantity ='Must Pick An Amount';
	        }
	        
	        return {
	            errors
	        }

	}

	handleSubmit(e, data){
		e.preventDefault();
		const {formData} = data;
		const {errors} = this.validateInput(formData);//check for errors
		const{ product } = this.props;
		const{user}= this.props;

		//Update errors state 
		if (Object.keys(errors).length !== 0) {
		            this.setState({ errors });
		}

		if (Object.keys(errors).length === 0) {
		            this.setState({
		                errors: {},
		});
		            //Add Product price
		            if(formData.type === 'case'){
				formData.price = product.price.case;
			}else{
				formData.price = product.price.single;
			}
			formData.product = product;
			formData.userId = user.id;

			this.props.addProductToCart(data.formData)
			.then((res) =>{
				
				this.props.addToCart(res.data);
			} )
			// .catch((err) => this.setState({ errors: err.response.data }));
		}


	}

	render(){
		const {user} = this.props;
		const isLoading = this.props.isFetching;
		const { errors } = this.state;
		const { cart } = this.props;
		// if(isLoading){
		//           return(
		//           <Loader active inline='centered' />
		//           )
		// }else{}

		return(

			<div className='pageWrap'>
				<div className='navWrap'>
					<SideMenu {...this.props}/>
				</div>
				<div className='contentWrap'>
					<Container>
					<h2>Checkout</h2>
						<Grid >
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
									    <Grid.Column floated='left' width={5}>
									     <h4>SubTotal:</h4>
									    </Grid.Column>
									    <Grid.Column floated='right' width={5}>
									      <Image src='http://semantic-ui.com/images/wireframe/paragraph.png' />
									    </Grid.Column>
								        </Grid>
								        <Grid>
									    <Grid.Column floated='left' width={5}>
									     <h4>Tax:</h4>
									    </Grid.Column>
									    <Grid.Column floated='right' width={5}>
									      <Image src='http://semantic-ui.com/images/wireframe/paragraph.png' />
									    </Grid.Column>
								        </Grid>
								        <Divider />
								        <Grid>
									    <Grid.Column floated='left' width={5}>
									     <h4>Total:</h4>
									    </Grid.Column>
									    <Grid.Column floated='right' width={5}>
									      <Image src='http://semantic-ui.com/images/wireframe/paragraph.png' />
									    </Grid.Column>
								        </Grid>
								        <Button fluid className='checkout-button'>Send Order</Button>
							        	</div>
							        </div>
							      </Grid.Column>
								
							</Grid.Row>
						</Grid>
					</Container>
				</div>
			</div>

		)
		
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
		getSingleProduct: bindActionCreators(getSingleProduct, dispatch),
		pushSingleProduct: bindActionCreators(pushSingleProduct, dispatch),
		addProductToCart: bindActionCreators(addProductToCart, dispatch),
		addToCart: bindActionCreators(addToCart, dispatch),
		resetFetch: bindActionCreators(resetFetch, dispatch)

	}
}

export default connect(mapStateToProps, mapDispatchToProps) (CheckoutPage);