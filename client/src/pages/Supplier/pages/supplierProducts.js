/* eslint-disable */
import React, { PropTypes } from 'react';
import { Container, Grid, Image, Loader } from 'semantic-ui-react';
import{bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

//import action get
import {getSupplierProducts} from '../actions/getSupplierProducts';//call to database
import {grabSupplierProducts} from '../../../components/actions/productActions';//update state with products

//import user Actions
import {checkUserToken, userResetFetch} from '../../../components/actions/authActions';//update state with products

import SideMenu from '../components/SupplierMenu';
import SingleProduct from'../components/SingleProduct';
import  '../supplier.css';

class SupplierProducts extends React.Component{
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
		
		this.props.getSupplierProducts(userId)
		.then((res) => {

			const products = res.data.products;
			this.props.grabSupplierProducts(products);

		})
		.catch(() => this.setState({ errors: 'There Was An Error Fetching Data' }));
	}

	componentWillUnmount(){
		this.props.userResetFetch();
	}

	render(){
		const{user} = this.props;
		const{products} = this.props;

		const {success, userIsFetching} = this.props.activeUser;
		

		if(userIsFetching || !success){
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
						<h2>{user.companyName} : Products</h2>
							<Grid celled>
							 
							  {products.map((product, index) => <SingleProduct key={index} index={index} product={product} /> )}  
							 
							 
							  </Grid>
						</Container>
					</div>
				</div>

			)}else{
				browserHistory.push('/login');
			}
	}

}

function mapStateToProps(state){
	return {
		user: state.ActiveUser.user,
		products: state.Products.Products
	}

}

function mapDispatchToProps(dispatch){
	return{
		getSupplierProducts: bindActionCreators(getSupplierProducts, dispatch),
		grabSupplierProducts: bindActionCreators(grabSupplierProducts, dispatch),
		checkUserToken: bindActionCreators(checkUserToken, dispatch),
		userResetFetch: bindActionCreators(userResetFetch, dispatch)
	}
}

export default connect(
   mapStateToProps,
  mapDispatchToProps
)(SupplierProducts);