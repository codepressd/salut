/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import{bindActionCreators} from 'redux';
import { Container, Header, Icon, Grid, Image, Sidebar, Segment, Divider } from 'semantic-ui-react';

//close menu 
import {signupRequest, userResetFetch} from '../../../components/actions/authActions.js';

// Import Style
import '../faq.css';

//Import Mobile Menu

import MobileMenu from '../../../components/mobileMenu';

class faqPage extends React.Component {
  constructor(props){
            super(props);
  }

componentWillUnmount(){
    this.props.userResetFetch();
  }

  render(){
  return (
     <Sidebar.Pushable as={Segment}>
               <MobileMenu  {...this.props}/>
                <Sidebar.Pusher>
                        <Segment basic>
                        <Container >
                            <Image src='/bird.png' alt='bird' centered/>
                            <h2 className="center">Frequently Asked Questions</h2>

                              <Grid className="grid" columns={1}  stackable>
                                  <Grid.Row>
                                    <Grid.Column>
                                      <Header as='h2' >
                                        How Much Does it Cost?
                                        <Divider hidden />
                                        <h3>As of right now it is free. I just wanted to make it easier for me to order all of my products from multiple Suppliers!</h3>
                                      </Header>
                                      <Divider  />
                                      <Header as='h2' >
                                        When do you plan to charge for this service?
                                        <Divider hidden />
                                        <h3>I don't have a time frame, whenever it starts hurting my pocket book to run this app</h3>
                                      </Header>
                                       <Divider  />
                                      <Header as='h2' >
                                        I don't live in Reno?
                                        <Divider hidden />
                                        <h3>I don't blame you!! As of right now this app is only usable in northern Nevada</h3>
                                      </Header>
                                       <Divider  />
                                      <Header as='h2' >
                                        Is this app fake?
                                        <Divider hidden />
                                        <h3>Yes it is. This is just a demo of the app. I plan to have the live app up and running soon. So stay tuned!</h3>
                                      </Header>
                                       <Divider  />
                                      <Header as='h2' >
                                        Where will this app be live?
                                        <Divider hidden />
                                        <h3>You probably guessed this one, but it will be live at salut.io!!</h3>
                                      </Header>
                                    </Grid.Column>
                                  </Grid.Row>
                                </Grid>
                          </Container>
                  </Segment>
        </Sidebar.Pusher>
</Sidebar.Pushable>
  );
}
}

function mapDispatchToProps(dispatch){
    return{
        userResetFetch: bindActionCreators(userResetFetch ,dispatch)

    }    
}

export default connect(null, mapDispatchToProps)(faqPage);