import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email, role) =>
  db.ref(`users/${id}`).set({
    username,
    email,
    role
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

export const getUser = (uemail) =>
  db.ref('users').once('value').then(function(snapshot) {
    var users = (snapshot.val());
    console.log(users);
  });
