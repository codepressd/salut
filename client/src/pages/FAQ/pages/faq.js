/* eslint-disable */
import React from 'react';
import { Container, Header, Icon, Grid, Image } from 'semantic-ui-react';


// Import Style
import '../faq.css';

export function faqPage(props) {
  return (
    <div>
<div className="topCover">
      <Container >
        <Image src='/bird.png' alt='bird' centered/>
        <h2 className="center">Frequently Asked Questions</h2>
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



export default faqPage;