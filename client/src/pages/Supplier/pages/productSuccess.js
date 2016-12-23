/* eslint-disable */
import React from 'react';
import { Grid, Button, Container, Divider } from 'semantic-ui-react';
import { browserHistory } from 'react-router';
import{connect} from 'react-redux';

import SideMenu from '../components/SupplierMenu';
import '../supplier.css';

class SupplierProductSuccess extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		 const {user} = this.props;
		return(
		<div className='pageWrap'>
			<div className='navWrap'>
				<SideMenu {...this.props} />
			</div>
			<div className='contentWrap'>
				<Grid verticalAlign='middle' columns={1} centered>
					<Container>
					<h1>Product Uploaded Successfully</h1>
					</Container>
					<Divider hidden />
					<Container>
					<Button.Group>
					    <Button onClick={() => browserHistory.push('/supplier/dashboard/'+user.id+'/addProducts')}>Add Product</Button>
					    <Button.Or />
					    <Button onClick={() => browserHistory.push('/supplier/dashboard/'+user.id+'/products')} positive>View Products</Button>
					</Button.Group>
					</Container>
				</Grid>

			</div>
		</div>

		)
	}
}
export default connect(
  state => ({
    user: state.ActiveUser.user
  })
)(SupplierProductSuccess);

