/* eslint-disable */
import React, { PropTypes } from 'react';
import { Card , Divider, Image} from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';


class OneProduct extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: ''
        }

    }

    render() {
      
        const { product, user } = this.props;
        let imageUrl =  '/walrus-hat-noimage.jpg';

        if (product.image.length !== 0) {
            imageUrl = product.image;
        }
          

        return (
                  <Card  onClick={()=>browserHistory.push('/restaurant/dashboard/'+user.id+'/product/'+product._id)} centered>
                      <Card.Content>
                        <Image floated='right' size='tiny' src={imageUrl}/>
                        <Card.Header>
                       {product.title}
                        </Card.Header>
                        <Card.Meta>
                          <p><strong>Supplier : {product.supplier}</strong></p>
                          <p><strong>Single: ${product.price.single}</strong></p>
                          <p><strong>Case: ${product.price.case}</strong></p>
                        </Card.Meta>
                        <Divider />
                        <Card.Description>
                          {product.description}
                        </Card.Description>
                      </Card.Content>
                  </Card>
                  


        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.ActiveUser.user,
    }
}



export default connect(mapStateToProps)(OneProduct);
