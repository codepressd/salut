import React, { PropTypes } from 'react';
import { Container, Grid, Image, Card, Loader } from 'semantic-ui-react';
import {connect} from 'react-redux';
import{bindActionCreators} from 'redux';


import {getProducts} from '../actions/getProducts';//call to database return products
import {getAllProducts} from '../../../components/actions/productActions';//update state with products

//import product template

import OneProduct  from '../components/oneProduct';


import SideMenu from '../components/sideMenu';
import  '../restaurant.css';

class Shop extends React.Component{
	constructor(props){
		super(props);
	}

	componentWillMount() {
		const {user} = this.props;
		const userId = {
			userId : user.id
		}
		
		this.props.getProducts()
		.then((res) => {

			const {products} = res.data;
			this.props.getAllProducts(products);

		})
		.catch(() => this.setState({ errors: 'There Was An Error Fetching Data' }));
	}

	render(){
		const {user} = this.props;
		 const isLoading = this.props.isFetching;
		const {products} = this.props;
		
		if(isLoading){
		          return(
		          <Loader active inline='centered' />
		          )
		}else{

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

		)
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
		getAllProducts: bindActionCreators(getAllProducts, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps) (Shop);