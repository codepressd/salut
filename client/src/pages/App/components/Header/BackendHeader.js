import React from 'react';
import { browserHistory } from 'react-router';
import { Menu } from 'semantic-ui-react';
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
  
    return(
      <div className="header">
        <Menu className="navColor" pointing secondary>
        <span className="myBrand">Salut.io</span>
         <Menu.Item name='home' active={this.props.location.pathname === '/'} onClick={()=> browserHistory.push('/')} />
          <Menu.Item name='About' active={this.props.location.pathname === '/about'} onClick={()=> browserHistory.push('/about')} />
          <Menu.Item name='FAQ'  active={this.props.location.pathname === '/faq'} onClick={()=> browserHistory.push('/faq')} />
          <Menu.Menu position='right'>
          {/* <Menu.Item name='Profile'  active={context.router.isActive('/'+props.activeUser.user.role+'/dashboard/'+props.activeUser.user.id+'/profile', true)} onClick={()=> browserHistory.push('/'+props.activeUser.user.role+'/dashboard/'+props.activeUser.user.id+'/profile')} />*/}
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
    activeUser: state.ActiveUser,
    logoutUser: logoutUser
  }
}

export default connect(null, {mapStateToProps, logoutUser})(BackEndHeader);