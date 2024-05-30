import React, { useEffect, useState } from 'react'
import axios from 'axios'


const App = () => {
  const [data,setdata] = useState([])
  const [input , setInput] = useState({})

  const getdata = () => {
    axios.get(`http://localhost:3001/users`).then((res)=>{
      console.log(res);
      setdata(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  }
  const input_handler = (e) => {
    setInput({...input,[e.target.name] : e.target.value})
  }
  const Submit_handler = () => {
    axios.post(`http://localhost:3001/users`,input)
  }

  const deleteHandler = (id) => {
    axios.delete(`http://localhost:3001/users/${id}`)
  }

  const viewHandler = (val) => {
    setInput(val)
  }

  const updateHandler = () => {
    axios.put(`http://localhost:3001/users/${input.id}`,input).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    })
  }

  useEffect(()=>{
    getdata()
  },[data])

  return (
    <>

    <div class="modal" id="myModal">
  <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header">
        <h4 class="modal-title">Modal </h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>

      <div class="modal-body">
      <div className='my-2 mx-auto d-block text-center'>
        <input type='text' placeholder='name' className='mx-2' name='name' value={input.name} onChange={input_handler}></input>
        <input type='text' placeholder='username' className='mx-2' name='username' value={input.username} onChange={input_handler}></input>
        <button className='btn btn-primary mx-2 mt-2' onClick={Submit_handler}>Submit</button>
        <button className='btn btn-success mt-2' onClick={updateHandler}>Update</button>
      </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
      </div>

    </div>
  </div>
</div>

      
      {
        data?.map((val,id)=>{
          return(
            <div className='border border-1 border-dark my-2 w-25 text-center mx-auto d-block p-2' key={id}>
              
              <h3>id: {val.id}</h3>
              <h3>Name : {val.name}</h3>
              <h3>User_name : {val.username}</h3>
              <button className='btn btn-danger' onClick={() => deleteHandler(val.id)}>Delete</button>
              <button className='btn btn-warning ms-2' data-bs-toggle="modal" data-bs-target="#myModal" onClick={() => viewHandler(val)}>View</button>
            </div>
          )
        })
      }
    </>
  )
}

export default App