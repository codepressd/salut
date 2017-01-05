import React from 'react';
import { browserHistory } from 'react-router';
import { Menu, Dropdown, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { logoutUser } from '../../../../components/actions/authActions';

import './Header.css';

class BackEndHeader extends React.Component{

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

handleClick(){
  this.props.logoutUser();

}

  render(){
    let cart = this.props.cart.length;
    const {user} = this.props;
    return(
      <div className="header">
        <Menu className="navColor" pointing secondary>
        <span className="myBrand">Salut.io</span>
         <Menu.Item name='home' active={this.props.location.pathname === '/'} onClick={()=> browserHistory.push('/')} />
          <Menu.Item name='About' active={this.props.location.pathname === '/about'} onClick={()=> browserHistory.push('/about')} />
          <Menu.Item name='FAQ'  active={this.props.location.pathname === '/faq'} onClick={()=> browserHistory.push('/faq')} />
          <Menu.Menu position='right'>
          <Menu.Item  name='Dashboard' onClick={()=> browserHistory.push('/'+user.role+'/dashboard/'+user.id)} />
          <Button
                basic
                onClick={()=>browserHistory.push('/restaurant/dashboard/'+user.id+'/checkout')}
                size='small'
                className='cart'
                content='CART'
                icon='cart'
                label={{ as: 'a', basic: true, pointing: 'left', content: cart }}
          />
         <Menu.Item name='Logout'  onClick={()=> browserHistory.push('/logout')} />
          </Menu.Menu>
        </Menu>
    </div>
      )
  }
}


BackEndHeader.contextTypes = {
  router: React.PropTypes.object,
};

const mapStateToProps = function(state){
  return{
    user: state.ActiveUser.user,
    cart: state.ActiveUser.cart
  }
}

export default connect(mapStateToProps, {logoutUser})(BackEndHeader);