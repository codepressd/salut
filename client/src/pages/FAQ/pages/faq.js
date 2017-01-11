/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Icon, Grid, Image, Sidebar, Segment } from 'semantic-ui-react';


// Import Style
import '../faq.css';

//Import Mobile Menu

import MobileMenu from '../../../components/mobileMenu';

class faqPage extends React.Component {
  render(){
  return (
     <Sidebar.Pushable as={Segment}>
               <MobileMenu  {...this.props}/>
                <Sidebar.Pusher>
                        <Segment basic>
                        <Container >
                            <Image src='/bird.png' alt='bird' centered/>
                            <h2 className="center">Frequently Asked Questions</h2>
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
  );
}
}



export default connect()(faqPage);