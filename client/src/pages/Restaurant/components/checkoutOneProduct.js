import React, { PropTypes } from 'react';
import { Grid, Image, Button,  Divider, Item, Icon} from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

//Cart

// import {addToCart} from '../actions/removeProduct';
//import {updateCart} from '../../../components/actions/productActions';

class CheckoutOneProduct extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: ''
        }

    }

    render() {
        const { product, user } = this.props;
         let imageUrl = 'http://semantic-ui.com/images/wireframe/image.png';

        if (product.product.image.length !== 0) {
          imageUrl = product.image;
       }
       let size = product.type;
       console.log(product.type);
       if (product.quantity !== '1'){
        size = size+'s';
       }

        return (
            
                   <Item>
                    <Item.Image src={imageUrl} />

                    <Item.Content>
                      <Item.Header as='a'>{product.product.title}</Item.Header>
                      <Item.Meta>
                        <p>Quantity:  {product.quantity} {size}</p>
                         <p>Price:  ${product.price} per {product.type}</p>
                      </Item.Meta>
                      <Item.Description>Here is some test to fill in</Item.Description>
                      <Item.Extra>
                        <Button primary floated='right'>
                          Buy tickets
                          <Icon name='right chevron' />
                        </Button>
                      </Item.Extra>
                    </Item.Content>
                  </Item>


        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.ActiveUser.user,
    }
}

// function mapDispatchToProps(dispatch) {
//     return {
//         deleteProduct: bindActionCreators(deleteProduct, dispatch),
//         removeProduct: bindActionCreators(removeProduct, dispatch)
//     }
// }


export default connect(mapStateToProps)(CheckoutOneProduct);