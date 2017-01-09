/* eslint-disable */
import React, { PropTypes } from 'react';
import { Container, Grid, Image, Card, Loader } from 'semantic-ui-react';
import {connect} from 'react-redux';
import{bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';


import {getProducts} from '../actions/getProducts';//call to database return products
import {getAllProducts} from '../../../components/actions/productActions';//update state with products
import {resetFetch} from '../../../components/actions/productActions';//reset fetching

//import product template
import OneProduct  from '../components/oneProduct';

//import user Actions
import {checkUserToken, userResetFetch} from '../../../components/actions/authActions';//update user state

import SideMenu from '../components/sideMenu';
import  '../restaurant.css';

class Shop extends React.Component{
	constructor(props){
		super(props);
	}

	componentWillMount() {
		const {user} = this.props;
		const{token} = this.props.activeUser;
		const userId = {
			userId : user.id
		}

		const userInfo = {
			token,
			userId: user.id
		}
		this.props.checkUserToken(userInfo);
		
		this.props.getProducts()
		.then((res) => {

			const {products} = res.data;
			this.props.getAllProducts(products);

		})
		.catch(() => this.setState({ errors: 'There Was An Error Fetching Data' }));
	}
	componentWillUnmount(){
		this.props.userResetFetch();
		this.props.resetFetch();

	}

	render(){
		const {user} = this.props;
		 const isLoading = this.props.isFetching;
		const {products} = this.props;
		const {success, userIsFetching} = this.props.activeUser;
		
		if(isLoading || !success){
		          return(
		          <Loader active inline='centered' />
		          )
		}else if(success){
			return(

				<div className='pageWrap'>
					<div className='navWrap'>
						<SideMenu {...this.props}/>
					</div>
					<div className='contentWrap'>
						<Container>
						<h2>{user.companyName} : Shop </h2>
							<Card.Group >
								{products.map((product, index) => <OneProduct key={index} index={index} product={product} /> )} 
							</Card.Group>
						</Container>
					</div>
				</div>

			)}else{
				browserHistory.push('/login');
			}
	}

}

function mapStateToProps(state){
	return{
		user: state.ActiveUser.user,
		products: state.Products.Products,
		isFetching: state.Products.isFetching
	}
}

function mapDispatchToProps(dispatch){
	return{
		getProducts: bindActionCreators(getProducts, dispatch),
		getAllProducts: bindActionCreators(getAllProducts, dispatch),
		resetFetch : bindActionCreators(resetFetch, dispatch),
		checkUserToken: bindActionCreators(checkUserToken, dispatch),
		userResetFetch: bindActionCreators(userResetFetch, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps) (Shop);