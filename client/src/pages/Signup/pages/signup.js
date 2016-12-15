import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { signupRequest } from '../actions/signupActions';
import {authorizeUser} from '../../../components/actions/authActions.js';
import { Container, Header, Icon, Grid, Image, Button, Checkbox, Form, Input, Message, Radio, Select, TextArea, Divider } from 'semantic-ui-react';
import classnames from 'classnames';
//import validateInput from '../../../../util/validateSignup.js';
// Import Style
import '../signup.css';

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
            errors: {}

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateInput = this.validateInput.bind(this);
    }

    validateInput (data) {
        let errors = {};
        let typeOfUser = '';

        Object.keys(data).map(function(objectKey, index) {
            let value = data[objectKey];

            if (typeof value == 'string' && value.length < 1) {

                errors[objectKey] = 'This Field Is Required';

            }
            if (data[objectKey] !== true && objectKey === 'terms') {
                errors.terms = 'Must Agree To Our Terms and Conditions';
            }

        });
        if (data.password !== data.passwordConfirm) {
            errors.password = 'Passwords Don\'t Match';
            errors.passwordConfrim = 'Passwords Don\'t Match';
        }
        
        return {
            errors,
            typeOfUser
        }

    }

    handleSubmit(e, data) {
        e.preventDefault();
      
        const { errors, typeOfUser} = this.validateInput(data.formData);

        if (Object.keys(errors).length !== 0) {
            this.setState({ errors });
        }

        if (Object.keys(errors).length === 0) {
            this.setState({
                errors: {},
            });

            this.props.signupRequest(data.formData)
                .then((res) =>{
                	//if success push user data to store
                	const { _id, companyName, email, firstName, lastName, role} = res.data.user;
                	const token = res.data.token;
                	const activeUser ={
                		id: _id,
                		email,
                		firstName,
                		lastName,
                		companyName,
                		role
                	}
                	this.props.authorizeUser(activeUser, token);
                	browserHistory.push('/'+activeUser.role+'/dashboard/' +activeUser.id);	
                })
                .catch((err) => this.setState({ errors: err.response.data }));
        }
    }
    render() {
        const { errors } = this.state;
        return (
            <div>
       <div className='topCover'>
            <Container >
              <Image src='/bird.png' alt='bird' centered/>
              <h2 className='center'>Supplier Sign Up</h2>
            </Container>
      </div>
    {/*Form Submit*/}
    <Container className='form'>
       <Form onSubmit={this.handleSubmit}>

       <Form.Group  widths='equal' >
          <Form.Input label={errors.username && errors.username || 'Username'} className={classnames({'error': errors.username})} name='username' placeholder={errors.username && errors.username || 'Pick a Username'} required />
          <Form.Input label={errors.email && errors.email ||'Email'} className={classnames({'error': errors.email})} name='email' placeholder={errors.email && errors.email ||'Email'} required />
        </Form.Group>

         <Form.Input label='Password' className={classnames({'error': errors.password})} type='password' name='password' placeholder={errors.password && errors.password ||'Password'} required />
          <Form.Input label='Password Confirm' className={classnames({'error': errors.passwordConfirm})} type='password' name='passwordConfirm' placeholder={errors.passwordConfirm && errors.passwordConfirm ||'Confrim Password'} required />

        <Form.Group className='group' widths='equal'>
          <Form.Input label='First Name' className={classnames({'error': errors.firstName})} name='firstName' placeholder={errors.firstName && errors.firstName ||'First Name'} required/>
          <Form.Input label='Last Name' className={classnames({'error': errors.lastName})} name='lastName' placeholder={errors.lastName && errors.lastName ||'Last Name'} required/>
          <Form.Input label='Company Name' className={classnames({'error': errors.companyName})} name='companyName' placeholder={errors.companyName && errors.companyName ||'Company Name'} required />
        </Form.Group>

        <Divider horizontal>Your Business Location</Divider>

        <Form.Group className='group' widths='equal'>

          <Form.Input label='Address' className={classnames({'error': errors.address})} name='address' placeholder={errors.address && errors.address ||'Address'} required/>
          <Form.Input label='City' className={classnames({'error': errors.city})} name='city' placeholder={errors.city && errors.city ||'City'} required/>
          <Form.Input label='State' className={classnames({'error': errors.state})} name='state' placeholder={errors.state && errors.state ||'State'}  required/>

        </Form.Group>

        <Divider horizontal>Business Type</Divider>
       
        <Form.Group  className='group' widths='equal'>
          
            <Form.Select className={classnames({'error': errors.businessType})} label='Business Type'  name='businessType' options={supplyType} placeholder={errors.businessType && errors.businessType||'Business Type'}  required />
             <Form.Select className={classnames({'error': errors.role})} label='Business Role'  name='role' options={role} placeholder={errors.role && errors.role||'Business Role'}  required />
              <Form.Select className={classnames({'error': errors.region})} label='Business Region'  name='region' options={region} placeholder={errors.region && errors.region||'Business Region'}  required />
         
        </Form.Group>

        <Form.Checkbox className={classnames({'error': errors.terms})} name='terms'  label='I agree to the Terms and Conditions' required/>
        <Button primary type='submit'>Submit</Button>
      </Form>
      </Container>
</div>
        )
    }
}

function mapStateToProps(state) {
    return {
        signupRequest: signupRequest(state),
        authorizeUser: authorizeUser(state)
    };
}

Signup.propTypes = {
    signupRequest: React.PropTypes.func.isRequired,
    authorizeUser: React.PropTypes.func.isRequired
}

export default connect(null, { signupRequest, authorizeUser })(Signup);
