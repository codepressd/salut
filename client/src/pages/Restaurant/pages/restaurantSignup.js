import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Icon, Grid, Image, Button, Checkbox, Form, Input, Message, Radio, Select, TextArea, Divider  } from 'semantic-ui-react';


// Import Style
import styles from '../restaurant.css';

const foodStyle = [
  { text: 'American', value: 'American' },
  { text: 'French', value: 'French' },
  { text: 'Italian', value: 'Italian' },
  { text: 'Japanese', value: 'Japanese' },
  { text: 'Chinese', value: 'Chinese' },
  { text: 'Vietnamese', value: 'Vietnamese' },
  { text: 'Greek', value: 'Greek' },
]

class RestaurantSignup extends React.Component{
  handleSubmit =(e)=>{
    e.preventDefault();
  }
  render(){
    return(
    <div>
       <div className={styles.topCover}>
            <Container >
              <Image src='/bird.png' alt='bird' centered/>
              <h2 className={styles.center}>Restaurant Sign Up</h2>
            </Container>
      </div>
    {/*Form Submit*/}
    <Container className={styles.form}>
       <Form onSubmit={this.handleSubmit}>
       <Form.Group  widths='equal'>
          <Form.Input label='Username' name='username' placeholder='Username' />
          <Form.Input label='Email' name='email' placeholder='Email' />
        </Form.Group>
        <Form.Group className={styles.group} widths='equal'>
          <Form.Input label='First Name' name='firstName' placeholder='First Name' />
          <Form.Input label='Last Name' name='lastName' placeholder='Last Name' />
          <Form.Input label='Restaurant Name' name='restName' placeholder='Restaurant Name' />
        </Form.Group>
        <Divider horizontal>Restaurant Location</Divider>
        <Form.Group className={styles.group} widths='equal'>
          <Form.Input label='Address' name='address' placeholder='Address' />
          <Form.Input label='City' name='city' placeholder='City' />
          <Form.Input label='State' name='state' placeholder='State' />
        </Form.Group>
        <Divider section />
        <Form.Select label='Type Of Food' name='typeOfFood' options={foodStyle} placeholder='Type Of Food' />
        <Form.Group widths='2'>
          <Form.Field>
            <label>Region</label>
            <Form.Group inline>
              <Form.Checkbox label='Northern Nevada' name='northNevada' value='noNevada' />
              <Form.Checkbox label='Southern Nevada' name='southNevada' value='soNevada' />
            </Form.Group>
          </Form.Field>
        </Form.Group>
        <Form.TextArea name='details' label='Details' placeholder='Anything else we should know?' rows='3' />
        <Form.Checkbox name='terms' label='I agree to the Terms and Conditions' />
        <Button primary type='submit'>Submit</Button>
      </Form>
      </Container>
    </div>
)}
}

export default RestaurantSignup;