import React, { PropTypes } from 'react';
import { Container, Grid, Image } from 'semantic-ui-react';

import SideMenu from '../components/sideMenu';
import styles from '../restaurant.css';

class Suppliers extends React.Component{

	render(){
		return(
			<div className={styles.pageWrap}>
				<div className={styles.navWrap}>
					<SideMenu {...this.props}/>
				</div>
				<div className={styles.contentWrap}>
					<Container>
					<h2>Restaurant's Name : Suppliers View</h2>
						<Grid celled>
						    <Grid.Row>
						      <Grid.Column width={3}>
						        <Image src='http://semantic-ui.com/images/wireframe/image.png' />
						      </Grid.Column>
						      <Grid.Column width={13}>
						        <Image src='http://semantic-ui.com/images/wireframe/centered-paragraph.png' />
						      </Grid.Column>
						    </Grid.Row>

						    <Grid.Row>
						      <Grid.Column width={3}>
						        <Image src='http://semantic-ui.com/images/wireframe/image.png' />
						      </Grid.Column>
						      <Grid.Column width={10}>
						        <Image src='http://semantic-ui.com/images/wireframe/paragraph.png' />
						      </Grid.Column>
						      <Grid.Column width={3}>
						        <Image src='http://semantic-ui.com/images/wireframe/image.png' />
						      </Grid.Column>
						    </Grid.Row>
						  </Grid>
					</Container>
				</div>
			</div>

		)
	}

}

export default Suppliers;