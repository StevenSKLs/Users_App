import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

const UsersList = ({ usersList , selectionUsers, getUsers}) => {

  const order = usersList.sort((a,b)=>
    a.first_name.localeCompare(b.first_name) )
   
    const deletes= (user)=>{
        axios.delete(`https://users-crud.academlo.tech/users/${user.id}/`).then(()=> getUsers())
    }

    const [page, setPage] = useState(1)
    const PageUser = 4;
    const lastPage = page * PageUser;
    const firstPage = lastPage - PageUser;
    const UsersPaginated = order.slice(firstPage, lastPage);
    const totalPages = Math.ceil(order.length / PageUser)
    //morty.residents? Math.ceil(morty.residents?.length / perPage):1
    
    const retro =()=>{
      setPage(1)
    }

  return (
    <div className="colory">
      <h1>Users List</h1>
      <div className="card">
        {UsersPaginated.map((user) => (
          <div key={user.id} className='cards_users'>
            <div>
            <h2 style={{fontSize: '1rem', marginBottom: '3px'}}>
              {user.first_name}, {user.last_name}
            </h2>
              <div style={{marginBottom: '3px'}}>
                <b>Email: </b>
                {user.email}
              </div>
              <div style={{marginBottom: '3px'}}>
                <b>Password: </b>
                {user.password}
              </div>
              <div style={{marginBottom: '3px'}}>
                {user.birthday}
              </div>
            </div>
            <div className="card_edit">
            <i className="fa-solid fa-user-pen" onClick={()=>
              { {
                Swal.fire({
                  title:'Slect User',
                  text:'Confirmed user',
                  icon: 'success',
                  timer: 2000,
                  showConfirmButton: false
                }),selectionUsers(user)
              }}}></i>
              
    <i className="fa-solid fa-trash-can" style={{color:'red'}} onClick={()=>
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
                    title:'List update',
                    text:'User was deleted successfully',
                    icon:'success'
                  })
                  deletes(user)
                  retro()
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
          }></i>
            </div>
          </div>
        ))}
      </div>

      <div className="buttonss2">
        {page ===1?(''):<button onClick={() => setPage(page - 1)}> 
        <i className="fa-solid fa-angles-left"></i>
        </button>
        }
        {page} / {totalPages}
        {page === totalPages?(''):<button
          onClick={() => setPage(page + 1)}>
            <i className="fa-solid fa-angles-right"></i>
        </button>
        }
        
      </div>
    </div>
  );
};

export default UsersList;
