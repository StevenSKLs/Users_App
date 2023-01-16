import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios";
import UsersForm from "./components/UsersForm";
import UsersList from "./components/UsersList";


function App() {
  const [usersList, setusersList] = useState([]);
  const [usersSelect, setusersSelect] =useState(null)

  useEffect(() => {
    axios
      .get("https://users-crud.academlo.tech/users/")
      .then((res) => setusersList(res.data));
  }, []);

  const getUsers =()=>{
    axios
      .get("https://users-crud.academlo.tech/users/")
      .then((res) => setusersList(res.data));
  }

  const selectionUsers =(user)=>{
    setusersSelect(user)
  }
  
  return (
    <div className="App">
      <UsersForm getUsers={getUsers} usersSelect={usersSelect} selectionUsers={selectionUsers}/>
      <UsersList usersList={usersList} selectionUsers={selectionUsers} getUsers={getUsers}/>
    </div>
  );
}

export default App;


