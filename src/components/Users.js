import React, { Component } from 'react';

import withAuthorization from './withAuthorization';
import { db } from '../firebase';

import './Users.css';

class UserPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
    };
  }

  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState({ users: snapshot.val() })
    );
    db.getUser();
  }

  render() {
    const { users } = this.state;
    return (
      <div>
        <h1>Users</h1>
        { !!users && <UserList users={users} /> }
      </div>
    );
  }
}

const UserList = ({ users }) =>
  <div>
    <h2>List of Users</h2>
    <p>(Saved on Sign Up in Firebase Database)</p>

    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
      {Object.keys(users).map(key =>
        <tr class={users[key].role}>
          <td key={key}>{users[key].username}</td>
          <td key={key}>{users[key].email}</td>
          <td key={key}>{users[key].role}</td>
        </tr>
      )}
      </tbody>
    </table>
  </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(UserPage);
