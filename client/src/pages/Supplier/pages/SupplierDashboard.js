/* eslint-disable */
import React, { PropTypes } from 'react';
import axios from 'axios';
import { Container, Grid, Image, Header, Icon, Divider, Form, Button, Loader, Sidebar, Segment } from 'semantic-ui-react';
import {connect} from 'react-redux';
import{bindActionCreators} from 'redux';
import{browserHistory} from 'react-router';
import classnames from 'classnames';

import SideMenu from '../components/SupplierMenu';
import '../supplier.css';

//Import Mobile Menu
import MobileMenu from '../../../components/mobileMenu';

//import Actions
import {updateUserData, changePassword, checkUserToken, userResetFetch} from '../../../components/actions/authActions';//send to database

class SupplierDashboard extends React.Component{

	constructor (props){
		super(props);

		this.state ={
			errors: {},
		}

		this.handleInfoSubmit = this.handleInfoSubmit.bind(this);
		this.handleResetPassword = this.handleResetPassword.bind(this);
	}

	componentWillMount(){
		const{token} = this.props.activeUser;
		const userId = this.props.activeUser.user.id;
		const userInfo = {
			token,
			userId
		}
		this.props.checkUserToken(userInfo);
	}

	componentWillUnmount(){
		this.props.userResetFetch();
	}

	validateInput (data) {
	        let errors = {};

	        Object.keys(data).map(function(objectKey, index) {
	            let value = data[objectKey];

	            if (typeof value == 'string' && value.length < 1) {

	                errors[objectKey] = 'This Field Is Required';

	            }
	            if (data[objectKey] !== true && objectKey === 'terms') {
	                errors.terms = 'Must Agree To Our Terms and Conditions';
	            }

	        });
	        
	        if (data.newPassword !== data.confirmPassword) {
	            errors.newPassword = 'Passwords Don\'t Match';
	            errors.confirmPassword = 'Passwords Don\'t Match';
	        }
	        
	        return {
	            errors
	        }

	}

	handleInfoSubmit(e, data){
		e.preventDefault();

		const { errors} = this.validateInput(data.formData);

		if (Object.keys(errors).length !== 0) {
		            this.setState({ errors });
		 }

		if (Object.keys(errors).length === 0) {
		            this.setState({
		                errors: {},
		            });
		           data.formData.userId = this.props.activeUser.user.id;
		            this.props.updateUserData(data.formData);
		}

		

	}

	handleResetPassword(e, data){
		e.preventDefault();
		const { errors} = this.validateInput(data.formData);

		if (Object.keys(errors).length !== 0) {
		            this.setState({ errors });
		 }

		if (Object.keys(errors).length === 0) {
		            this.setState({
		                errors: {},
		            });
		           data.formData.userId = this.props.activeUser.user.id;
		          
		           this.props.changePassword(data.formData);
		}

	}

	render(){

		const {errors} =this.state;
		const serverErrors = this.props.activeUser.error || '';
		const {user, success, userIsFetching} = this.props.activeUser;
		

		if(userIsFetching || !success){
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
					<Header as='h1' textAlign='center'>
						Welcome To Salut.io
					</Header> 
						<Grid stackable doubling>
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
        							
  							<Form.Input label='Company Name' name='companyName' placeholder='Company Name' required/>
  							<Form.Input label='Address' name='address' placeholder='Address' required/>
  							<Form.Input label='City' name='city' placeholder='City' required/>
  							<Form.Input label='State' name='state' placeholder='State' required/>
          							<Button primary type='submit' floated='right'>Update Information</Button>
          						           </Form>
          						           
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
	  							<Form.Input label={serverErrors.passwordError && serverErrors.passwordError || 'Old Password'} className={classnames({'error': serverErrors.passwordError})} name='oldPassword' type='password'  placeholder='Old Password' required/>
	  							<Form.Input label={errors.newPassword && errors.newPassword ||'New Password'} className={classnames({'error': errors.newPassword})} name='newPassword' type='password' placeholder={errors.newPassword && errors.newPassword ||'New Password'} required/>
	  							<Form.Input label={errors.confirmPassword && errors.confirmPassword ||'Confirm Password'} className={classnames({'error': errors.confirmPassword})} name='confirmPassword' type='password' placeholder={errors.confirmPassword && errors.confirmPassword ||'Confirm Password'} required/>
  							</Form.Group>
  							<Button primary type='submit' floated='right'>Reset Password</Button>
          						       </Form>
          						        </Grid.Column>
						    </Grid.Row>
						  </Grid>
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

function mapDispatchToProps(dispatch){
	return{
		updateUserData: bindActionCreators(updateUserData, dispatch),
		changePassword: bindActionCreators(changePassword, dispatch),
		checkUserToken: bindActionCreators(checkUserToken, dispatch),
		userResetFetch: bindActionCreators(userResetFetch, dispatch)
	}
}

export default connect(null, mapDispatchToProps) (SupplierDashboard);