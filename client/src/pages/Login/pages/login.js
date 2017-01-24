/* eslint-disable */
import React from 'react';
import { Container, Grid, Form, Icon, Header, Checkbox, Button, Sidebar, Segment, Image } from 'semantic-ui-react';
import { loginRequest, userResetFetch } from '../../../components/actions/authActions.js';
import { connect } from 'react-redux';
import{bindActionCreators} from 'redux';
import { browserHistory } from 'react-router';
import classnames from 'classnames';


//Login css
import '../login.css';

//Import Mobile Menu
import MobileMenu from '../../../components/mobileMenu';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: {}

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateInput = this.validateInput.bind(this);
    }

    componentWillUnmount(){
    this.props.userResetFetch();
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
        }
    }

    render() {
         const { errors } = this.state;
         const {message} = this.props.activeUser; 
         const serverErrors = this.props.activeUser.error;
        return (
                  <Sidebar.Pushable as={Segment}>
                                    <MobileMenu  {...this.props}/>
                                    <Sidebar.Pusher>
                                                    <Segment basic>
                                                    <Container className='fullPage'>        
                                                    <Image src='/walrus-hat.png' centered/>       
                                        		<Header as='h2' textAlign='center'>
                                        		      <Header.Content>
                                        		        Login
                                        		      </Header.Content>
                                                                                  {message}
                                                                                  {serverErrors.password}
                                                                                  {serverErrors.email}
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
                                            <Grid className="grid" columns={2} divided centered stackable>
                                          <Grid.Row>
                                                    <Grid.Column>
                                                      <Header as='h2' icon>
                                                        <Icon name='shipping' />
                                                        Supplier Login Details
                                                      </Header>
                                                      <h3>Username: demo@supplier.com</h3>
                                                      <h3>Password: demo</h3>
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                      <Header as='h2' icon>
                                                        <Icon name='shopping basket' />
                                                        Restaurant Login Details
                                                      </Header>
                                                      <h3>Username: demo@restaurant.com</h3>
                                                      <h3>Password: demo</h3>
                                                    </Grid.Column>
                                          </Grid.Row>
                                          </Grid>   
                                        	         </Container>

                                                      </Segment>
                                    </Sidebar.Pusher>
                 </Sidebar.Pushable>
        )
    }
}


function mapDispatchToProps(dispatch){
    return{
        loginRequest: bindActionCreators(loginRequest ,dispatch),
        userResetFetch: bindActionCreators(userResetFetch ,dispatch)

    }    
}
Login.propTypes = {
    loginRequest: React.PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(Login);
