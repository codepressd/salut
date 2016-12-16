import React, { PropTypes } from 'react';
import { Grid, Image, Button } from 'semantic-ui-react';
import{bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//remove product function

import {deleteProduct} from '../actions/removeProduct';

class SingleProduct extends React.Component {
	constructor(props){
		super(props);

	}

	removeProduct(productId){
		const deleteProductId = {
			productId: productId
		}
		this.props.deleteProduct(deleteProductId);
	}

	render(){
		const {product} = this.props;

		return(
			<Grid.Row>
			      <Grid.Column width={2}>
			        <Image src='http://semantic-ui.com/images/wireframe/image.png' />
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
				    <Button icon='setting' content='Edit' />
				    <Button onClick={this.removeProduct.bind(this, product._id)} icon='ban' content='Remove'/>
			         </Button.Group>
			      </Grid.Column>
			    </Grid.Row>

		)
	}
}



export default connect(null,{deleteProduct}) (SingleProduct);