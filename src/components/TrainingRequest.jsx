import style from '../cssFiles/signup.module.css'
import { useState,useEffect, useContext} from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import {mycontext} from './Config'

export default function TrainingRequest(){
    const {usertokenData} = useContext(mycontext)
    const navigate = useNavigate()
    const [petName,setPetName] =useState("")
    const [petAge,setPetAge] = useState("")
    const [petBreed,setPetBreed] = useState("")
    const [gender,setGender] = useState("")
    const [trainingType,setTrainingType]=useState("")
    const [description,setDescription] =useState("")
    const [mobile,setMobile] = useState("")
    const [status,setStatus] = useState(0)
    // -----------------------------------------------
    const [petNameError,setPetNameError]=useState("")
    const [petAgeError,setPetAgeError]=useState("")
    const [petBreedError,setPetBreedError]=useState("")
    const [petGenderError,setPetGenderError]=useState("")
    const [trainingTypeError,setTrainingTypeError]=useState("")
    const [descriptionError,setDescriptionError]=useState("")
    const [mobileError,setMobileError]=useState("")
    // -------------------------------------------------
    console.log(usertokenData.userId)
    let userId = usertokenData.userId
    async function handleSubmit(e){
        e.preventDefault()
        !petName?setPetNameError("PetNameisMandatory"):setPetNameError("")
        !petAge?setPetAgeError("PetAgeIsMandatory"):setPetAgeError("")
        !petBreed?setPetBreedError("PetBreedMandatory"):setPetBreedError("")
        !gender?setPetGenderError("PetGenderIsMandatory"):setPetGenderError("")
        !trainingType?setTrainingTypeError("TrainingTypeIsMandatory")
        :setTrainingTypeError("")
        !description?setDescriptionError("Please Write Something About You Pet Behaviour"):setDescriptionError("")
        if(!mobile){
            setMobileError("MobileNumer Is Mandatory")
            return
        }else{
            setMobileError("")
        }
        let response = await fetch("http://localhost:5504/training",{
            method:"post",
            headers:{'content-type':"application/json"},
            body:JSON.stringify({petName,petAge,petBreed,gender,trainingType,description,mobile,status,userId})
        })

        if(response.status === 200){
            setPetName("")
            setPetAge("")
            setPetBreed("")
            setGender("")
            setTrainingType("")
            setDescription("")
            setMobile("")
            navigate("/trainingplaceddata")
            }
    }
    return(
        <>
        <div className={`${style.formContainer} ${style.setImageTotrainingRequest} `}>
           
            <div className={style.formBox}>
                <div className={style.formMin}>
                <form id={style.form} onSubmit={handleSubmit}>
                <h1 className={style.formHeader}>Pet Training Form</h1>
                    <div className={style.inputgroup} >

                        <input type='text' value={petName} placeholder='Pet Name' onChange={(e)=>setPetName(e.target.value)}/>
                        <small className={style.errorMessage}>{petNameError}</small>

                    </div>
                    <div className={style.inputgroup} style={{display:"flex",gap:"8px"}}>
                    <div >
                        <input type='text' value={petAge} placeholder='petAge' onChange={(e)=>setPetAge(e.target.value)}/>
                        <small className={style.errorMessage}>{petAgeError}</small>
                        </div>
                        <div>
                        <input type='text'  value={petBreed} placeholder='petBreed' onChange={(e)=>setPetBreed(e.target.value)}/>
                        <small className={style.errorMessage}>{petBreedError}</small>
                        </div>
                    </div>
                    <div className={style.inputgroup}>
                        
                        <select type='text' className={style.gender} value={gender}  onChange={(e)=>setGender(e.target.value)}>
                            <option value="">select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <small className={style.errorMessage}>{petGenderError}</small>
                    </div>
                    <div className={style.inputgroup}>
                        <select type='text'  className={style.trainingType} value={trainingType} placeholder='Confirm Password' onChange={(e)=>setTrainingType(e.target.value)}>
                            <option value="">select Training Type</option>
                            <option value={1}>Beginner</option>
                            <option value={2}>advanced</option>
                            <option value={3}>Specialized</option>
                        </select>
                        <small className={style.errorMessage}>{trainingTypeError}</small>
                    </div>
                    <div className={style.inputgroup}>
                        <textarea type='text' maxLength={500} className={style.description}  value={description} placeholder='Write something about your pet behaviour' onChange={(e)=>setDescription(e.target.value)}/>
                        <small className={style.errorMessage}>{descriptionError}</small>
                    </div>
                    <div className={style.inputgroup}>
                        <input type='text'  value={mobile} placeholder='Enter Your Mobile Number' onChange={(e)=>setMobile(e.target.value)}/>
                        <small className={style.errorMessage}>{mobileError}</small>
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