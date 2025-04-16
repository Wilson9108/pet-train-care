import { useState, useEffect, } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import style from '../cssFiles/signup.module.css'

export default function AdminSignup() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")


    async function handleSubmit(e) {
        e.preventDefault()
        if (!email) {
            setEmailError("Email Cannot Be Empty")

        } else {
            setEmailError("")
        }
        if (!password) {
            setPasswordError("password cannot be empty")
            return
        } else {
            setPasswordError("")
        }
        let response = await fetch("http://localhost:5504/admin/signup", {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ email, password })
        })
        let data = await response.json()
        if (response.status === 409) {
            setEmailError(data.message)
            return
        }
        if (response.status === 200) {
            navigate("/adminsignin")
        }
        setEmail("")
        setPassword("")
    }
    return (
        <>
            <div className={`${style.formContainer} ${style.setImageToAdminSignup}`}>
                <div className={style.formBox}>
                    <div className={style.formMin} style={{ backgroundColor: "rgba(0, 0, 0, 0.21)" }}>
                        <form id={style.form} onSubmit={handleSubmit}>
                            <h1 className={style.formHeader}>Admin Signup</h1>
                            <hr></hr>
                            <div className={style.inputgroup}>
                                <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                <small className={style.errorMessage}>{emailError}</small>
                            </div>

                            <div className={style.inputgroup}>
                                <input type='text' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                <small className={style.errorMessage}>{passwordError}</small>
                            </div>
                            <div>
                                <p className='text-center text-light'  >Already Have An Account?
                                    <Link className={style.signupLink} to="/adminsignin">Signin</Link></p>
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