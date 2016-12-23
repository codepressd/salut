/* eslint-disable */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Icon, Grid, Image } from 'semantic-ui-react';


// Import Style
import  '../about.css';


export function aboutPage(props) {
  return (
    <div>
<div className="topCover">
      <Container >
        <Image src='/bird.png' alt='bird' centered/>
        <h2 className="center">About Page</h2>
      </Container>
</div>
<Grid className="grid" columns={3} divided>
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
  </div>
  );
}



export default aboutPage;