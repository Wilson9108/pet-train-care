import {useState,useEffect, useContext} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import style from '../cssFiles/signup.module.css'
import { mycontext } from './Config'
export default function Signin() {
    const {setIsUserLoggedIn}=useContext(mycontext)
    const navigate = useNavigate()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [emailError,setEmailError] = useState("")
    const [passwordError,setPasswordError] = useState("")

    async function handleSubmit(e){
        e.preventDefault()
        if(!email){
            setEmailError("Email Cannot Be Empty")
        }else{
            setEmailError("")
        }if(!password){
            setPasswordError("password cannot be empty")
            return
        }else{
            setPasswordError("")
        }

        let response = await fetch("http://localhost:5504/user/signin",{
            method:"post",
            headers:{"content-type":"application/json"},
            body:JSON.stringify({email,password})
        })
        let data = await response.json()
        if(response.status === 409){
            setEmailError(data.message)
            return 
        }
        if(response.status===401){
            setPasswordError("incorrect password")
            return
        }
        setEmail("")
        setPassword("")
        if(response.status === 200){
            localStorage.setItem('usertoken',data.token)
            setIsUserLoggedIn(true)
            navigate("/profile")
        }
    }

    return (
        <>
            <div className={`${style.formContainer} ${style.setImageInSignin} `}>

                <div className={style.formBox}>
                    <div className={style.formMin} style={{ backgroundColor: "rgba(4, 9, 4, 0.35)" }}>
                        <form id={style.form}  onSubmit={handleSubmit}>
                            <h1 className={style.formHeader}>Signin</h1>
                            <div className={style.inputgroup}>
                                <input type='text' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                                <small className={style.errorMessage}>{emailError}</small>
                            </div>
                            <div className={style.inputgroup}>
                                <input type='text' placeholder='Password' value={password}  onChange={(e)=>setPassword(e.target.value)} />
                                <small className={style.errorMessage}>{passwordError}</small>
                            </div>
                            <div>
                                <p className='text-center text-light'>Don't Have An Account? 
                                    <Link className={style.signupLink} to="/signup">Signup</Link></p>
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