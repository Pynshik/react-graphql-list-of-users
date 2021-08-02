import {useQuery, useMutation} from "@apollo/client";
import './App.css';
import {GQL_GET_ALL_USERS} from "./graphql/queries";
import {GQL_ADD_USER, GQL_DELETE_USER, GQL_UPDATE_USER} from './graphql/mutations';
import { useState } from "react";

function App() {
  const {loading, error, data: dataUsers} = useQuery(GQL_GET_ALL_USERS);
  const [addUser] = useMutation(GQL_ADD_USER, { refetchQueries: [{query: GQL_GET_ALL_USERS}], awaitRefetchQueries: true });
  const [deleteUser] = useMutation(GQL_DELETE_USER, { refetchQueries: [{query: GQL_GET_ALL_USERS}], awaitRefetchQueries: true });
  const [updateUserInDB] = useMutation(GQL_UPDATE_USER, { refetchQueries: [{query: GQL_GET_ALL_USERS}], awaitRefetchQueries: true });

  const [user, setUser] = useState({});
  const [editableUser, setEditableUser] = useState({});

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser({...user, [name]: value});
  };

  const handleSubmit = async (event) => {
    if(document.getElementById('submit').value === "Update user") {
      await updateUserInDB({variables: {id: editableUser.id, name: user.name ? user.name : editableUser.name, email: user.email ? user.email : editableUser.email, age: user.age ? +user.age : +editableUser.age}});
    };
    await addUser({variables: {name: user.name, email: user.email, age: +user.age}});
  };

  const updateUser = (user) => {
    setEditableUser(user);
  };

  const deleteUserById = async (id) => {
    await deleteUser({variables: {id}});
  };

  if(loading) return 'Loading...';
  if(error) return `Error ${error.message}!`;

  return (
    <div className="main">
      <h1>List of all users</h1>
      {dataUsers.users.map(user => {
          return <li key={user.id}>
            {user.name}: {user.age} years old
            <input type="button" onClick={() => updateUser(user)} value="&#9998;" />
            <input type="button" onClick={() => deleteUserById(user.id)} value="&#10008;" />
            </li>
      })}
      <hr/>
      <form onSubmit={handleSubmit}>
        <p><label>Name*:</label><input name="name" type="text" onChange={handleInputChange} defaultValue={editableUser.name ? editableUser.name : ""} /></p>
        <p><label>Email*:</label><input name="email" type="email" onChange={handleInputChange} defaultValue={editableUser.email ? editableUser.email : ""} /></p>
        <p><label>Age*:</label><input name="age" type="number" onChange={handleInputChange} defaultValue={editableUser.age ? editableUser.age : ""} /></p>
        <p><input id="submit" type="submit" value={editableUser.name ? "Update user" : "Add user"}/></p>
      </form>
    </div>
)};

export default App;
