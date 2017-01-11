/* eslint-disable */
import React, { PropTypes } from 'react';
import { Container, Grid, Image } from 'semantic-ui-react';
import {connect} from 'react-redux';
import{bindActionCreators} from 'redux';

import SideMenu from '../components/sideMenu';
import '../restaurant.css';

class Suppliers extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		const {user} = this.props;
		return(
			<div className='pageWrap'>
				<Container>
				<h2>{user.companyName} : Suppliers</h2>
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

		)
	}

}

function mapStateToProps(state){
	return{
		user: state.ActiveUser.user,
	}
}

export default connect(mapStateToProps) (Suppliers);