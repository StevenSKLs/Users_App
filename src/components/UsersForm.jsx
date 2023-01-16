import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const UsersForm = ({getUsers ,usersSelect, selectionUsers}) => {
  const { handleSubmit, register, reset } = useForm();
  
  const empety ={first_name:(''), last_name:(''),email:(''),password:(''),birthday:('')}

  useEffect(()=>{
    if (usersSelect) {
      reset(usersSelect)
    }else{
      reset(empety)
    }
  },[usersSelect])


  const submit = (data) => {
    console.log(data);
    Swal.fire({
      title:'Create new user?',
      text:'Do you wish to continue?',
      icon: 'question',
      showDenyButton: true,
      denyButtonText: 'Not',
      confirmButtonText: 'Yes'
    }).then(reply =>{
      if (reply.isConfirmed) {
        Swal.fire({
          text:'Welcome user',
          icon:'success'
        })
        if (usersSelect) {
      axios.put(`https://users-crud.academlo.tech/users/${usersSelect.id}/`,data).then(()=>{
      getUsers(),
      selectionUsers(null)
    })
    } else {
      axios
      .post("https://users-crud.academlo.tech/users/", data)
      .then(() => {getUsers(),reset(empety)});
    } 
      } else if(reply.isDenied){
        Swal.fire({
          text:'User not added or replaced',
          icon:'success',
          timer: 2000,
          showConfirmButton: false
        })
      } else{
        Swal.fire({
          text:'No user confirmed',
          icon:'error',
        })
      }
    })
    
  }; 


  return (
    <form onSubmit={handleSubmit(submit)} className="Forms">
      <h1>CREATE USER</h1>
      <div className="submits">
              <div>
                <ul style={{listStyle: 'none'}}>
                  <li>
            <i className="fa-solid fa-user" style={{marginBottom: '8px'}}></i>
                  </li>
                  <li>
           <i className="fa-solid fa-envelope" style={{marginBottom: '8px'}}></i>         
                  </li>
                  <li>
          <i className="fa-solid fa-lock" style={{marginBottom: '8px'}}></i>      
                  </li>
                  <li>
           <i className="fa-solid fa-cake" style={{marginBottom: '8px'}}></i>         
                  </li>
                </ul>
      </div>
      <div>
          <div className="input_users">
        <div className="inputs">
        <label htmlFor="first_name"></label>
        <input type="text" id="first_name" {...register("first_name")} required placeholder="First Name"/>
      </div>
       <div className="inputs">
        <label htmlFor="last_name"></label>
        <input type="text" id="last_name" {...register("last_name")} placeholder="Last Name"/>
      </div>
      </div>
     <div className="inputs">
        <label htmlFor="email"></label>
        <input type="text" id="email" {...register("email")} required  placeholder="user@email.com"
      pattern=".+@[a-z0-9.-]+\.com"/>
      </div>
      <div className="inputs">
        <label htmlFor="password"></label>
        <input type="password" id="password" {...register("password")} placeholder="Password"/>
      </div>
      <div className="inputs">
      <label htmlFor="birthday"></label>
        <input type="date" id="birthday" {...register("birthday")} 
        min="2000-01-01" max="2050-12-31" required placeholder="Birthday"/>
      </div>
      </div>
      </div>
      <div className="buttonss"><button>Submit</button></div>
    </form>
  );
};

export default UsersForm;
