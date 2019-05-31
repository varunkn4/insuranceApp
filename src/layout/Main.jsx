import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import PropTypes from 'prop-types';

import Home from '../pages/home';


import registry from 'app-registry';


class Main extends React.Component {
  componentWillMount = () => {
    const token = registry.get('storage').getItem('token');
    if (token === null) {
      this.context.router.history.push('/login');
    }
    else {
      //this.props.fetchUserDetails();
    }
  }
  logout = (event) =>{
      event.preventDefault();
      this.context.router.history.push('/login');
  }
  redirectHome = () =>{
    this.context.router.history.push('/home');
  }
  render() {
    return (
      <div>
        {/* <div className="header">
            <div>
                <label className="title" onClick={this.redirectHome}>Insurance Claims Agent Solution</label>      
                <div className="actionItems pull-right pr-3">
                    <i className="fas fa-power-off pointer" onClick={this.logout}></i>
                </div>                   
            </div>                                       
        </div> */}
        <div className="content">
            <Switch>
                <Route exact={true} path="/home" component={Home} />
                <Route path="*" render={() => <Redirect to="/home" />} />
            </Switch>
        </div>        
      </div>
    );
  }
}

Main.propTypes = {
  userDetails: PropTypes.objectOf(PropTypes.any),

};

Main.contextTypes = {
  router: PropTypes.object.isRequired
}

export default Main;
