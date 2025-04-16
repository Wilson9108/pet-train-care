import { createContext, useEffect, useState } from 'react'
import App from '../App'
export const mycontext = createContext()
export default function Config() {
    const [usertokenData, setUserTokenData] = useState("")
    const [admintokenData,setAdminTokenData] = useState("")
    const [isAdminLoggedIn,setIsAdminLoggedIn] =useState(false)
    const [isUserLoggedIn,setIsUserLoggedIn] = useState(false)
    const [trainingId, setTrainingId] = useState("")
    const [petDaysCareId,setPetDaysCareId]=useState("")
    const [loading,setLoading]=useState(false)

    console.log(admintokenData)
    const userId = usertokenData.userId
    let usertoken = localStorage.getItem("usertoken")
    let admintoken = localStorage.getItem("admintoken")
    
    //handle user logout
    async function handleLogout() {
   localStorage.removeItem("usertoken")
         setIsUserLoggedIn(false)
    }
    
    //handle admin logout 
 function handleAdminLogout(){
    localStorage.removeItem("admintoken")
    setIsAdminLoggedIn(false)
   }

   //user verify token

    async function verifyToken(token) {
        // let usertoken = localStorage.getItem("usertoken")
        setLoading(true)
        if (!token) {
            return
        }
        let response = await fetch("http://localhost:5504/user/verifyToken", {
            method: "get",
            headers: { 'Authorization': `Bearer ${token}` }
        })
        console.log(response)
        let data = await response.json()
        console.log(data.decoded)
        setLoading(false)
        setUserTokenData(data.decoded)
        setIsUserLoggedIn(true)
    
    }
    //admin verify token

    async function adminVerifyToken(token){
        // let admintoken =localStorage.getItem("admintoken")

        let response = await fetch("http://localhost:5504/user/verifyToken",{
            method:"get",
            headers:{'Authorization':`Bearer ${token}`}
        })
        console.log(response)
        let data = await response.json()
        console.log(data.decoded)
        setAdminTokenData(data.decoded)
        setIsAdminLoggedIn(true)
        
    }

    // it is used to set admin and user logged in 
    useEffect(()=>{
        if(admintokenData && admintokenData.role){
            setIsAdminLoggedIn(true)
            
        }else{
            setIsAdminLoggedIn(false)
        }
        if(usertokenData && usertokenData.role){
            setIsUserLoggedIn(true)
            
        }else{
            setIsUserLoggedIn(false)
        }
        
    },[])

    ///this will run when ever user token and admin token
    useEffect(()=>{
        let usertoken = localStorage.getItem("usertoken")
        let admintoken = localStorage.getItem("admintoken")
        if(usertoken){
            verifyToken(usertoken)
            console.log("hey you have the user token")
            
        }else{
            console.log("hey you dont have the user token")
            
        }if(admintoken){
            console.log("hey you have the admin token")
            adminVerifyToken(admintoken)
        }else{
            console.log("hey you dont have the admin token")
        }
    },[isAdminLoggedIn,isUserLoggedIn])



    // handle training accept 
    function handleAccept(data) {
        setTrainingId(data._id)
        console.log(data._id)
    }
    // handle pet care accept
    function handlePetCareAccept(data){
        console.log(data)
        setPetDaysCareId(data._id)
        
    }

    // useEffect(()=>{

    // },[usertoken,admintoken])

    return (
        <>

            <mycontext.Provider value={{handleAdminLogout,loading,setLoading, handleLogout,handlePetCareAccept,petDaysCareId,setIsAdminLoggedIn,userId,admintoken,usertoken,isUserLoggedIn,isAdminLoggedIn, verifyToken,setIsUserLoggedIn,adminVerifyToken, trainingId, usertokenData, handleAccept,admintokenData }}>
                <App />
            </mycontext.Provider>

        </>
    )

}