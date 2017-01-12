/* eslint-disable */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Icon, Grid, Image, Sidebar, Segment, Divider } from 'semantic-ui-react';

// Import Style
import  '../about.css';

//Import Mobile Menu
import MobileMenu from '../../../components/mobileMenu';

class AboutPage extends React.Component{
  render(){
  return (
    <Sidebar.Pushable as={Segment}>
        <MobileMenu  {...this.props}/>
        <Sidebar.Pusher>
                  <Segment basic>
                        <Container >
                                    <Image src='/bird.png' alt='bird' centered/>
                                    <h2 className="center">About Me</h2>
                                    <Divider />
                                    <Container text>
                                   <h3 className="center">My name is Chris Reeder, I've managed restaurants for almost 10 years and been in the restaurant industry for over 15 years</h3>
                                   <Divider hidden />
                                   <h3 className="center">During that time I have done every position there is in a restaurant. Currently I'm the General Manager of a small restaurant named Beaujolais Bistro in Reno, NV</h3>
                                   <Divider hidden />
                                   <h3 className="center">One thing that is always a pain when it comes to running a restaurant is ordering. Obviously it is a very important part about running any business, but it is always such a pain. For us at Beaujolais, we have well over 20 different suppliers and trying to keep track of what each supplier carries is a super daunting task.</h3>
                                   <Divider hidden />
                                   <h3 className="center">That is why I wanted to create this application to make keeping track of ordering much easier. Since I've been learning web development over the past year, I thought what a perfect time to build something I can could acctually use!</h3>
                                   <Divider hidden />
                                   <h3>If  you like what you see or would like to get a hold of me, check the links below:</h3>
                                            <Grid className="grid" columns={3} divided centered stackable>
                                                  <Grid.Row>
                                                    <Grid.Column>
                                                    <a href="https://www.linkedin.com/in/chris-reeder-78938662">
                                                      <Header as='h3' icon>
                                                        <Icon name='linkedin' />
                                                        Linkedin
                                                      </Header>
                                                      </a>
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                    <a href="https://twitter.com/codepressd">
                                                      <Header as='h3' icon>
                                                        <Icon name='twitter' />
                                                        Twitter
                                                      </Header>
                                                      </a>
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                    <a href="https://github.com/codepressd">
                                                      <Header as='h3' icon>
                                                        <Icon name='github' link />
                                                        Github
                                                      </Header>
                                                      </a>
                                                    </Grid.Column>
                                                  </Grid.Row>
                                            </Grid>
                                   </Container>
                          </Container>
                  </Segment>
        </Sidebar.Pusher>
</Sidebar.Pushable>
  )
}
}



export default connect()(AboutPage);