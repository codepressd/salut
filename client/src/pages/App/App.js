import React, { Component } from 'react';
import { connect } from 'react-redux';

// Import Style
//import styles from './App.css';

// Import Components
import DevTools from './components/DevTools';
import BackEndHeader from './components/Header/BackendHeader';
import FrontEndHeader from './components/Header/FrontEndHeader';
import Footer from './components/Footer/Footer';


export class App extends Component {
    constructor(props) {
        super(props);
        this.state = { isMounted: false };
    }

    componentDidMount() {
        this.setState({ isMounted: true }); // eslint-disable-line
    }


    render() {
         
        const Header = ({activeUser: {user}}) => user ? <BackEndHeader {...this.props} /> : <FrontEndHeader {...this.props} />;
        return (
            <div>
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
        <div>
          <Header activeUser={this.props.activeUser} {...this.props} />
          <div >
            {React.cloneElement(this.props.children, this.props)}
          </div>
          <Footer />
        </div>
      </div>
        );
    }
}


// Retrieve data from store as props
function mapStateToProps(store) {
    return {
        activeUser: store.ActiveUser
    };
}

export default connect(mapStateToProps)(App);
