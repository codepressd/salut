/* eslint-disable */
import React from 'react';
import { Grid, Button, Container, Divider, Sidebar, Segment } from 'semantic-ui-react';
import { browserHistory } from 'react-router';
import{connect} from 'react-redux';

import SideMenu from '../components/SupplierMenu';
import '../supplier.css';

//Import Mobile Menu
import MobileMenu from '../../../components/mobileMenu';

class InfoUpdateSuccess extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		 const {user} = this.props;
		return(
		<Sidebar.Pushable as={Segment}>
		        <MobileMenu  {...this.props}/>
		        <Sidebar.Pusher>
                  		<Segment basic>
			<div className='pageWrap'>
				<Grid verticalAlign='middle' columns={1} centered>
					<Container>
					<h1>Updated Successfully</h1>
					</Container>
					<Divider hidden />
					<Container>
					<Button.Group>
					    <Button onClick={() => browserHistory.push('/supplier/dashboard/'+user.id)}>Dashboard</Button>
					    <Button.Or />
					    <Button onClick={() => browserHistory.push('/supplier/dashboard/'+user.id+'/orders')} positive>Orders</Button>
					</Button.Group>
					</Container>
				</Grid>
			</div>
			</Segment>
        		        </Sidebar.Pusher>
		</Sidebar.Pushable>
		)
	}
}
export default connect(
  state => ({
    user: state.ActiveUser.user
  })
)(InfoUpdateSuccess);