import React from 'react';
import { withRouter } from 'react-router-dom';

import AuthUserContext from './AuthUserContext';
import { firebase, db } from '../firebase';
import * as routes from '../constants/routes';

const withAdminAuthorization = (authCondition) => (Component) => {
  class WithAdminAuthorization extends React.Component {
    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        var promise = db.getUser(authUser.email);
        var role = "NAN";
        promise.then(function(result) {
          role = result;
        })
        if (!authCondition(authUser) || role != "ADMIN") {
          this.props.history.push(routes.HOME);
        }
      });
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser => authUser ? <Component {...this.props} /> : null}
        </AuthUserContext.Consumer>
      );
    }
  }

  return withRouter(WithAdminAuthorization);
}

export default withAdminAuthorization;
