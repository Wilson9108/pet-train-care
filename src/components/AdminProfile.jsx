import React, { useEffect,useContext } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {mycontext} from './Config'
const AdminProfile = () => {
  const navigate = useNavigate()
 const {isAdminLoggedin,adminVerifyToken,setIsAdminLoggedIn,handleAdminLogout} = useContext(mycontext)


 

 useEffect(()=>{
  let admintoken = localStorage.getItem("admintoken")
  adminVerifyToken(admintoken)
 },[])

  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center", height:"70vh"}}>
      {!isAdminLoggedin ?
      <>
      <Link to="/adminsignin" className='btn btn-danger' onClick={()=>handleAdminLogout()}>Logout</Link>
      
      </>
      :<Link to="/adminsignin" className='btn btn-primary' >login</Link>
}

      
    </div>
  )
}

export default AdminProfile
