import axios from "axios";
import React from "react";
import Swal from "sweetalert2";

const UsersList = ({ usersList , selectionUsers, getUsers}) => {

  const order = usersList.sort((a,b)=>
    a.first_name.localeCompare(b.first_name) )
   
    const deletes= (user)=>{
        axios.delete(`https://users-crud.academlo.tech/users/${user.id}/`).then(()=> getUsers())
    }

  return (
    <div>
      <h1>Users List</h1>
      <div>
        {order.map((user) => (
          <div key={user.id}>
            <h2>
              {user.first_name}, {user.last_name}
            </h2>
            <div>
              <div>
                <b>Email: </b>
                {user.email}
              </div>
              <div>
                <b>Password: </b>
                {user.password}
              </div>
              <div>{user.birthday}</div>
            </div>
            <button onClick={()=>
              { {
                Swal.fire({
                  title:'Slect User',
                  text:'Confirmed user',
                  icon: 'success',
                  timer: 2000,
                  showConfirmButton: false
                }),selectionUsers(user)
              }}}>Slect User</button>
          <button onClick={()=>
            {
              Swal.fire({
                title:'Delete user?',
                text:'The user will be permanently deleted.',
                icon: 'warning',
                showDenyButton: true,
                denyButtonText: 'Not',
                confirmButtonText: 'Yes'
              }).then(respuesta =>{
                if (respuesta.isConfirmed) {
                  Swal.fire({
                    text:'User was deleted successfully',
                    icon:'success'
                  })
                  deletes(user)
                } else if (respuesta.isDenied) {
                  Swal.fire({
                    title:'The user is still alive. XD',
                    text:'User was not deleted successfully',
                    icon:'success'
                  })
                } else{
                  Swal.fire({
                    text:'Unanswered',
                    icon:'error'
                  })
                }
              })
            }
          }>Delete User</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
