/* eslint-disable */
import React  from 'react';
import { connect } from 'react-redux';
import{bindActionCreators} from 'redux';
import { Container, Header, Icon, Grid, Image, Sidebar, Segment, Divider } from 'semantic-ui-react';

//close menu 
import {signupRequest, userResetFetch} from '../../../components/actions/authActions.js';

// Import Style
import  '../home.css';

import MobileMenu from '../../../components/mobileMenu';

class HomePage extends React.Component{
    constructor(props){
              super(props);
    }
    componentWillUnmount(){
    this.props.userResetFetch();
  }

render() {

  return (
   
      <Sidebar.Pushable as={Segment}>
               <MobileMenu  {...this.props}/>
                <Sidebar.Pusher>
                        <Segment basic>
                                <Container >
                                          <Image src='/bird.png' alt='bird' centered/>
                                          <h2 className="center">Welcome To Salut</h2>
                                          <h3 className="center">Easy Universal Ordering App</h3>
                                          <h4 className="center">To get Started, click the login button and use one of the user credentials below: </h4>
                                          <Divider />
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
                                          <Grid className="grid" columns={3} divided centered stackable>
                                                  <Grid.Row>
                                                    <Grid.Column>
                                                      <Header as='h2' icon>
                                                        <Icon name='home' />
                                                        One Shop Ordering
                                                        <Header.Subheader>
                                                          Order from all your suppliers in one place.
                                                        </Header.Subheader>
                                                      </Header>
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                      <Header as='h2' icon>
                                                        <Icon name='lemon' />
                                                        Local Suppliers 
                                                        <Header.Subheader>
                                                          We strive to provide you with as many local organic options as possible.
                                                        </Header.Subheader>
                                                      </Header>
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                      <Header as='h2' icon>
                                                        <Icon name='settings' />
                                                        Detailed Reporting
                                                        <Header.Subheader>
                                                          We have detailed reports to stay on top of your business.
                                                        </Header.Subheader>
                                                      </Header>
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
        userResetFetch: bindActionCreators(userResetFetch ,dispatch),

    }    
}



export default connect(null, mapDispatchToProps)(HomePage);