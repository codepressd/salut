/* eslint-disable */
import React, { PropTypes } from 'react';
import axios from 'axios';
import { Container, Grid, Image, Header, Icon, Divider, Form, Button } from 'semantic-ui-react';

import SideMenu from '../components/SupplierMenu';
import '../supplier.css';

class SupplierDashboard extends React.Component{

	constructor (props){
		super(props);

		this.handleInfoSubmit = this.handleInfoSubmit.bind(this);
		this.handleResetPassword = this.handleResetPassword.bind(this);
	}

	handleInfoSubmit(data){

	}

	handleResetPassword(data){

	}

	render(){
		//console.log(axios.defaults.headers.common['Authorization']);
		const {user} = this.props.activeUser;
		return(
			<div className='pageWrap'>
				<div className='navWrap'>
					<SideMenu {...this.props}/>
				</div>
				<div className='contentWrap'>
					<Container>
					<Header as='h1' textAlign='center'>
						Welcome To Salut.io
					</Header> 
						<Grid>
						    <Grid.Row>
						      <Grid.Column width={8} >
						        <Header as='h2' textAlign='center'>
							    <Icon name='settings' />
							    <Header.Content>
							      	Account Settings
							      <Header.Subheader>
							        	Manage your preferences
							      </Header.Subheader>
							    </Header.Content>
						         </Header>
						         <Divider hidden/>
						         <Form onSubmit={this.handleInfoSubmit}>
        							
  							<Form.Input label='Company Name' name='companyName' placeholder='Company Name' />
  							<Form.Input label='Address' name='address' placeholder='Address' />
  							<Form.Input label='City' name='city' placeholder='City' />
  							<Form.Input label='State' name='state' placeholder='State' />
          							
          						           </Form>
          						           <Button primary type='submit' floated='right'>Update Information</Button>
						      </Grid.Column>
						      <Grid.Column width={8}>
						        <Header as='h2' textAlign='center'>
							    <Icon name='users' />
							    <Header.Content>
							      	Company Information
							      <Header.Subheader>
							        	CurrentDetails
							      </Header.Subheader>
							    </Header.Content>
						             </Header>
						         <Divider  hidden/>
						         <Grid>
							<Grid.Column floated='left' width={3}>
							         <h3>CompanyName:</h3>
							         <h3>Address:</h3>
							         <h3>City:</h3>
							         <h3>State:</h3>
							</Grid.Column>
							<Grid.Column floated='right' width={10}>
							         <h3>{user.companyName}</h3>
							         <h3>{user.address}</h3>
							         <h3>{user.city}</h3>
							         <h3>{user.state}</h3>
							</Grid.Column>
						         </Grid>
						      </Grid.Column>
						    </Grid.Row>
						    <Divider />
						    <Grid.Row>
						    <Grid.Column>
						    <Header as='h2' textAlign='center'>
							    <Icon name='lock' />
							    <Header.Content>
							      	Update Password
							    </Header.Content>
						             </Header>
						      <Form onSubmit={this.handleResetPassword}>
        							<Form.Group widths='equal'>
	  							<Form.Input label='Old Password' name='companyName' placeholder='Old Password' />
	  							<Form.Input label='New Password' name='newPassword' placeholder='New Password' />
	  							<Form.Input label='Confirm Password' name='confirmPassword' placeholder='Confirm Password' />
  							</Form.Group>
          						       </Form>
          						        <Button primary type='submit' floated='right'>Reset Password</Button>
          						        </Grid.Column>
						    </Grid.Row>
						  </Grid>
					</Container>
				</div>
			</div>

		)
	}

}

export default SupplierDashboard;