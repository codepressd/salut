/* eslint-disable */
import React, { PropTypes } from 'react';
import { Container, Grid, Image, Card, Loader, Segment, Input, Menu, Sidebar } from 'semantic-ui-react';
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

//import product Actions
import {getProductCategory} from '../../../components/actions/productActions';//update user state

//Import Mobile Menu
import MobileMenu from '../../../components/mobileMenu';

import SideMenu from '../components/sideMenu';
import  '../restaurant.css';

class Shop extends React.Component{
	constructor(props){
		super(props);
		this.handleItemClick = this.handleItemClick.bind(this);
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

	handleItemClick(err, {name}){
		if(err){
			this.setState({errors: 'We had an error grabbing those products.'})
		}
		const category = {
			category: name.toLowerCase()
		}
		this.props.getProductCategory(category);
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
			<Sidebar.Pushable as={Segment}>
			        <MobileMenu  {...this.props}/>
			        <Sidebar.Pusher>
                  			<Segment basic>
				<div className='pageWrap'>
					<Container>
					<h2>{user.companyName} : Shop </h2>
						<Menu pointing stackable>
						          <Menu.Item name='All Products' onClick={this.handleItemClick} />
						          <Menu.Item name='Beer'  onClick={this.handleItemClick} />
						          <Menu.Item name='Wine' onClick={this.handleItemClick} />					          
						          <Menu.Item name='Liqour' onClick={this.handleItemClick} />
						          <Menu.Item name='Dry Goods' onClick={this.handleItemClick} />
						          <Menu.Item name='Meat' onClick={this.handleItemClick} />
						          <Menu.Item name='Produce' onClick={this.handleItemClick} />
						</Menu>

						
						<Card.Group  >
							{products.map((product, index) => <OneProduct key={index} index={index} product={product} /> )} 
						</Card.Group>
						
							
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
		products: state.Products.Products,
		isFetching: state.Products.isFetching
	}
}

function mapDispatchToProps(dispatch){
	return{
		getProducts: bindActionCreators(getProducts, dispatch),
		getAllProducts: bindActionCreators(getAllProducts, dispatch),
		getProductCategory: bindActionCreators(getProductCategory, dispatch),
		resetFetch : bindActionCreators(resetFetch, dispatch),
		checkUserToken: bindActionCreators(checkUserToken, dispatch),
		userResetFetch: bindActionCreators(userResetFetch, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps) (Shop);