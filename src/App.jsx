
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users,setUsers]=useState([])
  useEffect(()=>{
    fetch("http://localhost:5000/users")
    .then(res=>res.json())
    .then(data=>setUsers(data))
  },[])

  const handlerForm=event=>{
    event.preventDefault();
    const form =event.target;
    const name=form.name.value;
    const email=form.email.value;
    const user={name,email}
    // console.log(user);
    fetch("http://localhost:5000/users",{
      method:'POST',
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(user)
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      form.reset();
      //for real time show in  ui joratali
      setUsers([...users,data])
    })

  }

  return (
    <>
      <form onSubmit={handlerForm}>
        <input type="text" name='name'  /> <br />
        <input type="email" name='email'  /> <br />
        <button type='submit'>submit</button>
      </form>
      <h1>client</h1>
      <div className="card">
        
        {
          <p>{users.length}</p>
          
        }
        {
          users.map(user=><p key={user.id}>{user.name}</p>)
        }
      </div>
      
    </>
  )
}

export default App
