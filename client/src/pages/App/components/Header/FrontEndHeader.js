import React from 'react';
import { browserHistory } from 'react-router';
import { Menu, Dropdown, Button, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import{bindActionCreators} from 'redux';
import MediaQuery from 'react-responsive';

import './Header.css';

//User Actions
import { toggleUserMenu } from '../../../../components/actions/authActions';

class FrontEndHeader extends React.Component{

  constructor(props){
      super(props);
     this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  toggleVisibility(menu){
    const toggle = !menu;
    this.props.toggleUserMenu(toggle);
}

render(){
  const {menu} = this.props.activeUser;
  return (
    <div className="header">
    <MediaQuery minWidth={768}>
        <Menu className="navColor" pointing secondary>
        <span className="myBrand">Salut.io</span>
          <Menu.Item name='home' active={this.props.location.pathname === '/'} onClick={()=> browserHistory.push('/')} />
          <Menu.Item name='About' active={this.props.location.pathname === '/about'}  onClick={()=> browserHistory.push('/about')} />
          <Menu.Item name='FAQ'  active={this.props.location.pathname === '/faq'} onClick={()=> browserHistory.push('/faq')} />
          <Menu.Menu position='right'>
            <Menu.Item name='Signup'  active={this.props.location.pathname === '/signup'} onClick={()=> browserHistory.push('/signup')} />
            <Menu.Item name='Login'  active={this.props.location.pathname === '/login'} onClick={()=> browserHistory.push('/login')} />
          </Menu.Menu>
        </Menu>
        </MediaQuery>
        <MediaQuery maxWidth={767}>
        <Menu pointing secondary>
                  <span className="myBrand">Salut.io</span>
                  <Menu.Menu position='right'>
                          <Button icon onClick={this.toggleVisibility.bind(this, menu)}>
                                <Icon name='sidebar' />
                          </Button>
                  </Menu.Menu>
        </Menu>
        </MediaQuery>
    </div>
  )
}
}

FrontEndHeader.contextTypes = {
  router: React.PropTypes.object,
};


function mapDispatchToProps(dispatch){
  return{
    toggleUserMenu: bindActionCreators(toggleUserMenu, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(FrontEndHeader);