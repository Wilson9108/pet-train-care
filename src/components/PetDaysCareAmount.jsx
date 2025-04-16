import {useContext, useState} from 'react'
import style from '../cssFiles/signup.module.css'
import { useNavigate } from 'react-router-dom'
import {mycontext} from './Config'
export default function TrainingAmount(){
    const {petDaysCareId,admintokenData,usertokenData} = useContext(mycontext)

    const navigate = useNavigate()
    const [amount,setAmount]=useState("")
    const [description,setDescription] = useState("")
    // -------------------------------------------
    const [amountError,setAmountError]=useState("")
    const [descriptionError,setDescriptionError]=useState("")
    const adminId=admintokenData.adminId
    console.log(adminId)

    async function handleSubmit(e){
        e.preventDefault()
        if(!amount){
            setAmountError("Amount Is Mandatory")
        }
        else{
            setAmountError("")
        }
        if(!description){
            setDescriptionError("Description Is Mandatory")
            return
        }else{
            setDescriptionError("")
        }
        try{
        let admintoken = localStorage.getItem("admintoken")
        if(!admintoken){
            alert("please admin login")
            console.log("no admin token")
            return
        }
        
        let response = await fetch(`http://localhost:5504/petdayscareamount`,{
            method:"post",
            headers:{'content-type':"application/json"},
            body:JSON.stringify({amount,description,petDaysCareId,adminId})
        })
        console.log(response)
        if(response.status === 200){
            navigate('/petcaredata')
        }
    }catch(e){
        console.error(e.message)
    }}

    return(
        <>
         <div className={style.formContainer}>
                        <div className={style.formBox}>
                            <div className={style.formMin} style={{ backgroundColor: "rgba(0, 255, 17, 0.088)" }}>
                                <form id={style.form}  onSubmit={handleSubmit}>
                                    <h1 className={style.formHeader}>Pet Days Care Amount</h1>
                                    <div className={style.inputgroup}>
                                        <input type='text' placeholder='Amount' value={amount} onChange={(e)=>setAmount(e.target.value)} />
                                        <small className={style.errorMessage}>{amountError}</small>
                                    </div>
                                    <div className={style.inputgroup}>
                                        <input type='text' placeholder='description' value={description}  onChange={(e)=>setDescription(e.target.value)} />
                                        <small className={style.errorMessage}>{descriptionError}</small>
                                    </div>
                                    <div className={style.buttongroup}>
                                        <button className={style.submitBtn}>Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
        
                    </div>

        </>
    )
}