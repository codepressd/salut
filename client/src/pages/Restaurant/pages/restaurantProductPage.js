/* eslint-disable */
import React, { PropTypes } from 'react';
import { Container, Grid, Image, Loader, Divider, Form, Button, Segment, Sidebar } from 'semantic-ui-react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
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

//import user Actions
import {checkUserToken, userResetFetch} from '../../../components/actions/authActions';//update user state

//import product template
import OneProduct  from '../components/oneProduct';

//Import Mobile Menu
import MobileMenu from '../../../components/mobileMenu';

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

class ProductPage extends React.Component{

	constructor(props){
		super(props);

		this.state={
			errors: {}
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.validateInput = this.validateInput.bind(this);
	}

	componentWillMount() {
		const {productId} = this.props.params;
		const userId = this.props.activeUser.user.id;
		const{ token } = this.props.activeUser;
		const userInfo = {
			token,
			userId
		}
		this.props.checkUserToken(userInfo);

	                  this.props.getSingleProduct(productId)
	                 .then((res) => {
	                		const { product } = res.data;
	                		this.props.pushSingleProduct(product);

	            	})
	        	.catch((err) => this.setState({ errors: err.response.data }));
	}

	componentWillUnmount(){
		this.props.userResetFetch();
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
			formData.productId= product._id;
			formData.product = product;
			formData.userId = user.id;

			this.props.addProductToCart(data.formData)
			.then((res) =>{
				
				this.props.addToCart(res.data);
			} )
			.catch((err) => this.setState({ errors: err.response.data }));
		}


	}

	render(){
		const {user} = this.props;
		const isLoading = this.props.isFetching;
		const { product } = this.props;
		const { errors } = this.state;
		const {success, userIsFetching} = this.props.activeUser;
		let productImage = '/walrus-hat-noimage.jpg';

		//if  product has Image
		if(product.image !== ''){
			productImage = product.image;
		}

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
				<h2>Supplier : {product.supplier}</h2>
					<Grid columns='equal' stackable>
						<Grid.Row>
							<Grid.Column>
							<Image size='large' src={productImage} centered/>
							</Grid.Column>
							<Grid.Column>
							<h2>{product.title}</h2>
							<Divider />
							<h4>{product.description}</h4>
							<h4>Single: ${product.price.single}</h4>
							<h4>Case: ${product.price.case}</h4>

							<Divider />
							<Form onSubmit={this.handleSubmit}>
							        <Form.Group widths='equal'>
							          <Form.Select label={errors.quantity && errors.quantity || 'Quantity'} className={classnames({'error': errors.quantity})}  name='quantity' options={quantity} placeholder='Amount' required />
							          <Form.Select label={errors.type && errors.type || 'Single Or Case'} className={classnames({'error': errors.type})}  name='type' options={type} placeholder='Pick One' required  />
							        </Form.Group>
							        <Button fluid color='blue' type='submit'>Add To Cart</Button>
							</Form>

							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Container>
			</div>
			</Segment>
		        </Sidebar.Pusher>
		</Sidebar.Pushable>

		)
		}else{
			browserHistory.push('/login');
		}
	}

}

function mapStateToProps(state){
	return{
		user: state.ActiveUser.user,
		product: state.Products.Products,
		isFetching: state.Products.isFetching
	}
}

function mapDispatchToProps(dispatch){
	return{
		getSingleProduct: bindActionCreators(getSingleProduct, dispatch),
		pushSingleProduct: bindActionCreators(pushSingleProduct, dispatch),
		addProductToCart: bindActionCreators(addProductToCart, dispatch),
		addToCart: bindActionCreators(addToCart, dispatch),
		resetFetch: bindActionCreators(resetFetch, dispatch),
		checkUserToken: bindActionCreators(checkUserToken, dispatch),
		userResetFetch: bindActionCreators(userResetFetch, dispatch)

	}
}

export default connect(mapStateToProps, mapDispatchToProps) (ProductPage);