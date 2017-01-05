/* eslint-disable */
import React from 'react';
import { Container, Grid, Form, Icon, Header, Checkbox, Button } from 'semantic-ui-react';
import { authorizeUser, loginRequest } from '../../../components/actions/authActions.js';
//import { loginRequest } from '../actions/loginAction';
import { connect } from 'react-redux';
import{bindActionCreators} from 'redux';
import { browserHistory } from 'react-router';
//import validateInput from '../../../../util/validateLogin.js';
import classnames from 'classnames';

import '../login.css';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: {}

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateInput = this.validateInput.bind(this);
    }

    validateInput (data){
             let errors = {};
             Object.keys(data).map(function(objectKey, index) {
                 let value = data[objectKey];

                 if (typeof value == 'string' && value.length < 1) {

                     errors[objectKey] = 'This Field Is Required';

                 }

             });

             return {
                 errors
             }

    }
    handleSubmit(e, data) {
        e.preventDefault();
        const { errors} = this.validateInput(data.formData);
      
        if (Object.keys(errors).length !== 0) {
            this.setState({ errors });
        }

        if (Object.keys(errors).length === 0) {
            this.setState({
                errors: {},

            });
           
            this.props.loginRequest(data.formData);
                // .then((res) => {
                //     console.log(res.data.user);
                //     //if success push user data to store
                //     const { _id, companyName, email, firstName, lastName, role } = res.data.user;
                //     const token = res.data.token;
                //     const activeUser = {
                //         id: _id,
                //         email,
                //         firstName,
                //         lastName,
                //         companyName,
                //         role
                //     }
                //     this.props.authorizeUser(activeUser, token);
                //     browserHistory.push('/' + activeUser.role + '/dashboard/' + activeUser.id);
                // })
                // //  this.setState({ errors: err.response.data })
                // .catch((err) => console.log(err));
        }
    }

    render() {
        console.log('rendered');
         const { errors } = this.state;
        return (
            <Container className='fullPage'>
		<Header as='h2' icon textAlign='center'>
		      <Icon name='users' circular />
		      <Header.Content>
		        Login
		      </Header.Content>
		 </Header>

		<Grid verticalAlign='middle' columns={1} centered>
		
			    <Form onSubmit={this.handleSubmit}>
				<Form.Group  widths='equal' >
				          <Form.Input label={errors.email && errors.email || 'Email'} className={classnames({'error': errors.email})} name='email' placeholder={errors.email && errors.email || 'Email'} required />
				          <Form.Input label={errors.password && errors.password ||'Password'} type='password' className={classnames({'error': errors.password})} name='password' placeholder={errors.password && errors.password ||'Password'} required />
			        	</Form.Group>
			    <Button type='submit'>Submit</Button>
			  </Form>
		</Grid>
	</Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        //loginRequest: loginRequest(state),
       // authorizeUser: authorizeUser(state)
    };
}
function mapDispatchToProps(dispatch){
    return{
        loginRequest: bindActionCreators(loginRequest ,dispatch)
    }    
}
// Login.propTypes = {
//     loginRequest: React.PropTypes.func.isRequired,
//     authorizeUser: React.PropTypes.func.isRequired
// }

export default connect(null, mapDispatchToProps)(Login);
