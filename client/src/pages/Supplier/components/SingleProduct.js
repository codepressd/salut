import React, { PropTypes } from 'react';
import { Grid, Image, Button } from 'semantic-ui-react';
import{bindActionCreators} from 'redux';
import{browserHistory} from 'react-router';
import {connect} from 'react-redux';

//remove product function

import {deleteProduct} from '../actions/removeProduct';
import {removeProduct} from '../../../components/actions/productActions';

class SingleProduct extends React.Component {
	constructor(props){
		super(props);

		this.state ={
			message: ''
		}

	}

	removeProduct(productId, index){

		const productIndex = index;
		
		const deleteProductId = {
			productId: productId
		}

		this.props.deleteProduct(deleteProductId)
		.then((res) => {
			this.props.removeProduct(productIndex);
		})
		.catch();
	}

	render(){
		const {product, user} = this.props;
		let imageUrl = 'http://semantic-ui.com/images/wireframe/image.png';
		if(product.image.length !== 0){
			imageUrl = product.image;
		}
		return(
			<Grid.Row>
			      <Grid.Column width={2}>
			        <Image src={imageUrl} />
			      </Grid.Column>
			      <Grid.Column width={4}>
			        <h4>Product Title:</h4>
			        <h4> {product.title}</h4>
			      </Grid.Column>
			      <Grid.Column width={3}>
			        <h4>Categories:</h4>
			        <h4>{product.category}</h4>
			      </Grid.Column>
			      <Grid.Column width={2}>
			         <h4>Unit Price:</h4>
			        <h4>${product.price.single}</h4>
			      </Grid.Column>
			      <Grid.Column width={2}>
			         <h4>CasePrice:</h4>
			        <h4>${product.price.case}</h4>
			      </Grid.Column>
			      <Grid.Column width={3}>
			        <Button.Group attached='top' vertical>
				    <Button onClick={() => browserHistory.push('/supplier/dashboard/'+user.id+'/updateProducts/'+product._id)} icon='setting' content='Edit' />
				    <Button onClick={this.removeProduct.bind(this, product._id, this.props.index)} icon='ban' content='Remove'/>
			         </Button.Group>
			      </Grid.Column>
			    </Grid.Row>

		)
	}
}

function mapStateToProps(state){
	return{
		user: state.ActiveUser.user,
	}
}

function mapDispatchToProps (dispatch){
	return{
		deleteProduct: bindActionCreators(deleteProduct, dispatch),
		removeProduct: bindActionCreators(removeProduct, dispatch)
	}
}


export default connect(mapStateToProps,mapDispatchToProps) (SingleProduct);