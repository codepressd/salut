/* eslint-disable */
import React from 'react';
import { Grid, Button, Container, Divider, Loader, Segment, Sidebar } from 'semantic-ui-react';
import { browserHistory } from 'react-router';
import{bindActionCreators} from 'redux';
import{connect} from 'react-redux';

import SideMenu from '../components/sideMenu';
import '../restaurant.css';

//import Actions
import {updateUserData, changePassword, checkUserToken, userResetFetch} from '../../../components/actions/authActions';//send to database

//Import Mobile Menu
import MobileMenu from '../../../components/mobileMenu';

class SupplierProductSuccess extends React.Component{
	constructor(props){
		super(props);
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

	render(){
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
					<Grid verticalAlign='middle' columns={1} centered>
						<Container>
						<h1>Order Successful</h1>
						</Container>
						<Divider hidden />
						<Container>
						<Button.Group>
						    <Button onClick={() => browserHistory.push('/restaurant/dashboard/'+user.id)}>Dashboard</Button>
						    <Button.Or />
						    <Button onClick={() => browserHistory.push('/restaurant/dashboard/'+user.id+'/shop')} positive>Keep Shopping</Button>
						</Button.Group>
						</Container>
					</Grid>
				</div>
				</Segment>
			        </Sidebar.Pusher>
			</Sidebar.Pushable>

			)}else{
				browserHistory.push('/login');
			}
	}
}

function mapStateToProps(state){
	return{
		user: state.ActiveUser.user,
	}
}

function mapDispatchToProps(dispatch){
	return{
		checkUserToken: bindActionCreators(checkUserToken, dispatch),
		userResetFetch: bindActionCreators(userResetFetch, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SupplierProductSuccess);
