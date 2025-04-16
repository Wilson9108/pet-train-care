import style from '../cssFiles/signup.module.css'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
    const navigate = useNavigate()
    const [fname, setFname] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [password, setPassword] = useState("")
    const [conPassword, setConPassword] = useState("")

    const [fnameError, setFnameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [mobileError, setMobileError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [conPassError, setConPassError] = useState("")


    async function handleSubmit(e) {
        e.preventDefault()
        if (!fname) {
            setFnameError("Name cannot be Empty")

        } else {
            setFnameError("")
        } if (!email) {
            setEmailError("Email cannot be Empty")
        } else {
            setEmailError("")
        } if (!mobile) {
            setMobileError("Mobile Number Cannot be Empty")

        } else {
            setMobileError("")
        } if (!password) {
            setPasswordError("Password Cannot Be Empty")
            return
        } else {
            setPasswordError("")

        }
        if (password !== conPassword) {
            setConPassError("confirm password must be same as password")
            console.log("not equal to same")
            return
        } else {
            setConPassError("")
        }
        let response = await fetch("http://localhost:5504/user", {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ fname, email, mobile, password })
        })
        console.log(response.statusText)
        let data = await response.json()
        console.log(data)
        if (response.status === 409) {
            setEmailError(data.message)
            return
        }
        setFname("")
        setEmail("")
        setMobile("")
        setPassword("")
        setConPassword("")
        if (response.status === 200) {
            console.log("response is ok")
            navigate("/signin")
        }

    }
    return (
        <>
            <div className={`${style.formContainer} ${style.setImageToUserSignup}`}>

                <div className={style.formBox}>
                    <div className={style.formMin} style={{ backgroundColor: "rgba(20, 30, 30, 0.57)" }}>
                        <form id={style.form} onSubmit={handleSubmit}>
                            <h1 className={style.formHeader}>Signup</h1>
                            <div className={style.inputgroup}>
                                <input type='text' value={fname} placeholder='Full Name' onChange={(e) => setFname(e.target.value)} />
                                <small className={style.errorMessage}>{fnameError}</small>
                            </div>
                            <div className={style.inputgroup}>
                                <input type='text' value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                                <small className={style.errorMessage}>{emailError}</small>
                            </div>
                            <div className={style.inputgroup}>
                                <input type='text' value={mobile} placeholder='Mobile Number' onChange={(e) => setMobile(e.target.value)} />
                                <small className={style.errorMessage}>{mobileError}</small>
                            </div>
                            <div className={style.inputgroup}>
                                <input type='text' value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                                <small className={style.errorMessage}>{passwordError}</small>
                            </div>
                            <div className={style.inputgroup}>
                                <input type='text' value={conPassword} placeholder='Confirm Password' onChange={(e) => setConPassword(e.target.value)} />
                                <small className={style.errorMessage}>{conPassError}</small>
                            </div>
                            <div>
                                <p className='text-center text-light'  >Already Have An Account?
                                    <Link className={style.signupLink} to="/signin">Signin</Link></p>
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