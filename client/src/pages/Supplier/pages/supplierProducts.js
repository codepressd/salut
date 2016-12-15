import React, { PropTypes } from 'react';
import { Container, Grid, Image } from 'semantic-ui-react';
import {connect} from 'react-redux';

//import action get
import {getSupplierProducts} from '../actions/getSupplierProducts';
import SideMenu from '../components/SupplierMenu';
import  '../supplier.css';

class SupplierProducts extends React.Component{
	constructor(props){
		super(props);
	}

	componentWillMount() {
		const {user} = this.props;
		this.props.getSupplierProducts(user.id);
	}

	render(){
		return(
			<div className='pageWrap'>
				<div className='navWrap'>
					<SideMenu {...this.props}/>
				</div>
				<div className='contentWrap'>
					<Container>
					<h2>Supplier Dashboard : Products</h2>
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

export default connect(
  state => ({
    user: state.ActiveUser.user
  }), {getSupplierProducts}
)(SupplierProducts);