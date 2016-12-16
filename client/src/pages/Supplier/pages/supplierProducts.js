import React, { PropTypes } from 'react';
import { Container, Grid, Image } from 'semantic-ui-react';
import{bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//import action get
import {getSupplierProducts} from '../actions/getSupplierProducts';//call to database
import {grabSupplierProducts} from '../../../components/actions/productActions';//update state with products
import SideMenu from '../components/SupplierMenu';
import  '../supplier.css';

class SupplierProducts extends React.Component{
	constructor(props){
		super(props);
	}

	componentWillMount() {
		const {user} = this.props;
		const userId = {
			userId : user.id
		}
		this.props.getSupplierProducts(userId)
		.then((res) => {
			const products = res.data.products;
			this.props.grabSupplierProducts(products);

		})
		.catch(() => this.setState({ errors: 'There Was An Error Fetching Data' }));
	}

	render(){
		const{user} = this.props;
		return(
			<div className='pageWrap'>
				<div className='navWrap'>
					<SideMenu {...this.props}/>
				</div>
				<div className='contentWrap'>
					<Container>
					<h2>{user.companyName} : Products</h2>
						<Grid celled>
						    <Grid.Row>
						      <Grid.Column width={3}>
						        <Image src='http://semantic-ui.com/images/wireframe/image.png' />
						      </Grid.Column>
						      <Grid.Column width={13}>
						        <Image src='http://semantic-ui.com/images/wireframe/centered-paragraph.png' />
						      </Grid.Column>
						    </Grid.Row>

						    <Grid.Row>
						      <Grid.Column width={3}>
						        <Image src='http://semantic-ui.com/images/wireframe/image.png' />
						      </Grid.Column>
						      <Grid.Column width={10}>
						        <Image src='http://semantic-ui.com/images/wireframe/paragraph.png' />
						      </Grid.Column>
						      <Grid.Column width={3}>
						        <Image src='http://semantic-ui.com/images/wireframe/image.png' />
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
	return {
		user: state.ActiveUser.user,
		products: state.Products.Products
	}

}

function mapDispatchToProps(dispatch){
	return{
		getSupplierProducts: bindActionCreators(getSupplierProducts, dispatch),
		grabSupplierProducts: bindActionCreators(grabSupplierProducts, dispatch)
	}
}
// state => ({
//     user: state.ActiveUser.user
//   })

export default connect(
   mapStateToProps,
  mapDispatchToProps
)(SupplierProducts);