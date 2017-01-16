/* eslint-disable */
import React, { PropTypes } from 'react';
import { Grid, Image, Button,  Divider, Item, Icon} from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

//Cart
import '../restaurant.css';
import {deleteProductFromCart} from '../actions/deleteProductFromCart';
import {removeProductFromCart} from '../../../components/actions/productActions';

class CheckoutOneProduct extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: ''
        }
          this.calcProductTotal = this.calcProductTotal.bind(this);
    }

    calcProductTotal(numbers, quantity){
                const total = Number(numbers) * Number(quantity);
                return total;

    }

    handleRemove(productId, productIndex) {

              const userProductInfo = {
                  productId: productId,
                  userId: this.props.user.id
              }

              this.props.deleteProductFromCart(userProductInfo)
                  .then((res) => {
                      this.props.removeProductFromCart(productIndex);
                  })
                  .catch();

}


    render() {
            const { product, user } = this.props;
            let imageUrl = '/walrus-hat-noimage.jpg';
            const total = this.calcProductTotal(product.price, product.quantity);

            if (product.product.image.length !== 0) {
            imageUrl = product.product.image;
            }
            let size = product.type;
       
            if (product.quantity !== '1'){
                size = size+'s';
            }

        return (
            
                   <Item>
                    <Item.Image src={imageUrl} />

                    <Item.Content>
                      <Item.Header as='a'>{product.product.title}</Item.Header>
                      <Item.Meta>
                         <Grid className='innerGrid'>
                                  <Grid.Column floated='left' width={13}>
                                     <p>Quantity:  {product.quantity} {size}</p>
                                    <p>Price:  ${product.price} per {product.type}</p>
                                  </Grid.Column>
                                  <Grid.Column floated='right' width={2}>
                                    <p className='total-price'> ${total}</p>
                                  </Grid.Column>
                          </Grid>
                      </Item.Meta>
                      <Item.Extra>
                      <Button.Group >
                        <Button negative onClick={this.handleRemove.bind(this, product.product._id, this.props.index)}>Remove</Button>
                        <Button.Or />
                        <Button positive onClick={()=> browserHistory.push('/restaurant/dashboard/'+user.id+'/product/'+product.product._id)}>Edit Item</Button>
                      </Button.Group>
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

function mapDispatchToProps(dispatch) {
    return {
        deleteProductFromCart: bindActionCreators(deleteProductFromCart, dispatch),
        removeProductFromCart: bindActionCreators(removeProductFromCart, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CheckoutOneProduct);