import React from 'react';
import { Grid, Button, Container, Divider } from 'semantic-ui-react';
import { browserHistory } from 'react-router';
import{connect} from 'react-redux';

import SideMenu from '../components/sideMenu';
import '../restaurant.css';

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
		</div>

		)
	}
}
export default connect(
  state => ({
    user: state.ActiveUser.user
  })
)(SupplierProductSuccess);
