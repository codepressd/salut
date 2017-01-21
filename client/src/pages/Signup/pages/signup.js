/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import{bindActionCreators} from 'redux';
//import { signupRequest } from '../actions/signupActions';
import {signupRequest, userResetFetch} from '../../../components/actions/authActions.js';
import { Container, Header, Icon, Grid, Image, Button, Checkbox, Form, Input, Message, Radio, Select, TextArea, Divider, Sidebar, Segment } from 'semantic-ui-react';
import classnames from 'classnames';

// Import Style
import '../signup.css';

//Import Mobile Menu
import MobileMenu from '../../../components/mobileMenu';

const supplyType = [
    { text: '', value: '' },
    { text: 'Restaurant', value: 'restaurant' },
    { text: 'Farmer', value: 'farmer' },
    { text: 'Rancher', value: 'rancher' },
    { text: 'Co-op', value: 'co-op' },
    { text: 'Food Distributor', value: 'food-distributor' },
    { text: 'Produce Distributor', value: 'produce-distributor' },
    { text: 'Wine Distributor', value: 'wine-distributor' },
    { text: 'Liqour Distributor', value: 'liqour-distributor' },
]

const region = [
    { text: '', value: '' },
    { text: 'Northern Nevada', value: 'northNevada' },
    { text: 'Southern Nevada', value: 'southNevada' },
]

const role = [
    { text: '', value: '' },
    { text: 'Restaurant', value: 'restaurant' },
    { text: 'Supplier', value: 'supplier' },
]

class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: {}

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateInput = this.validateInput.bind(this);
    }

    componentWillUnmount(){
        this.props.userResetFetch();
    }

    validateInput (data) {
        let error = {};
        let typeOfUser = '';

        Object.keys(data).map(function(objectKey, index) {
            let value = data[objectKey];

            if (typeof value == 'string' && value.length < 1) {

                error[objectKey] = 'This Field Is Required';

            }
            if (data[objectKey] !== true && objectKey === 'terms') {
                error.terms = 'Must Agree To Our Terms and Conditions';
            }

        });
        
        if (data.password !== data.passwordConfirm) {
            error.password = 'Passwords Don\'t Match';
            error.passwordConfrim = 'Passwords Don\'t Match';
        }
        
        return {
            error,
            typeOfUser
        }

    }

    handleSubmit(e, data) {
        e.preventDefault();
      
        const { error, typeOfUser} = this.validateInput(data.formData);

        if (Object.keys(error).length !== 0) {
            this.setState({ error });
        }

        if (Object.keys(error).length === 0) {
            this.setState({
                error: {},
            });

            this.props.signupRequest(data.formData);
        }
    }
    render() {
        const { error } = this.props.activeUser;
        return (
                  <Sidebar.Pushable as={Segment}>
                            <MobileMenu  {...this.props}/>
                            <Sidebar.Pusher>
                                    <Segment basic>
                                                <Container >
                                                      <h2 className='center'> Sign Up</h2>
                                                </Container>
                                                <Divider />
                                                <Container className='form'>
                                                                   <Form onSubmit={this.handleSubmit}>

                                                                                    <Form.Group  widths='equal' >
                                                                                                      <Form.Input label={error.username && error.username || 'Username'} className={classnames({'error': error.username})} name='username' placeholder={error.username && error.username || 'Pick a Username'} required />
                                                                                                      <Form.Input label={error.email && error.email ||'Email'} className={classnames({'error': error.email})} name='email' placeholder={error.email && error.email ||'Email'} required />
                                                                                    </Form.Group>

                                                                                    <Form.Input label='Password' className={classnames({'error': error.password})} type='password' name='password' placeholder={error.password && error.password ||'Password'} required />
                                                                                    <Form.Input label='Password Confirm' className={classnames({'error': error.passwordConfirm})} type='password' name='passwordConfirm' placeholder={error.passwordConfirm && error.passwordConfirm ||'Confrim Password'} required />

                                                                                    <Form.Group className='group' widths='equal'>
                                                                                                      <Form.Input label='First Name' className={classnames({'error': error.firstName})} name='firstName' placeholder={error.firstName && error.firstName ||'First Name'} required/>
                                                                                                      <Form.Input label='Last Name' className={classnames({'error': error.lastName})} name='lastName' placeholder={error.lastName && error.lastName ||'Last Name'} required/>
                                                                                                      <Form.Input label='Company Name' className={classnames({'error': error.companyName})} name='companyName' placeholder={error.companyName && error.companyName ||'Company Name'} required />
                                                                                    </Form.Group>

                                                                                    <Divider horizontal>Business Type</Divider>
                                                                   
                                                                                    <Form.Group  className='group' widths='equal'>
                                                                                      
                                                                                                    <Form.Select className={classnames({'error': error.businessType})} label='Business Type'  name='businessType' options={supplyType} placeholder={error.businessType && error.businessType||'Business Type'}  required />
                                                                                                    <Form.Select className={classnames({'error': error.role})} label='Business Role'  name='role' options={role} placeholder={error.role && error.role||'Business Role'}  required />
                                                                                                    <Form.Select className={classnames({'error': error.region})} label='Business Region'  name='region' options={region} placeholder={error.region && error.region||'Business Region'}  required />
                                                                                     
                                                                                    </Form.Group>

                                                                                    <Divider horizontal>Your Business Location</Divider>

                                                                                    <Form.Group className='group' widths='equal'>

                                                                                                      <Form.Input label='Address' className={classnames({'error': error.address})} name='address' placeholder={error.address && error.address ||'Address'} required/>
                                                                                                      <Form.Input label='City' className={classnames({'error': error.city})} name='city' placeholder={error.city && error.city ||'City'} required/>
                                                                                                      <Form.Input label='State' className={classnames({'error': error.state})} name='state' placeholder={error.state && error.state ||'State'}  required/>

                                                                                    </Form.Group>

                                                                                    <Form.Checkbox className={classnames({'error': error.terms})} name='terms'  label='I agree to the Terms and Conditions' required/>
                                                                                    <Button primary type='submit'>Submit</Button>
                                                                  </Form>
                                                </Container>
                                    </Segment>
                            </Sidebar.Pusher>
                  </Sidebar.Pushable>
        )
    }
}


function mapDispatchToProps(dispatch){
    return{
        signupRequest: bindActionCreators(signupRequest ,dispatch),
        userResetFetch: bindActionCreators(userResetFetch ,dispatch)
    }    
}

Signup.propTypes = {
    signupRequest: React.PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(Signup);
