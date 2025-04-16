import { useState, useEffect, useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import { mycontext } from './Config'
import style from '../cssFiles/profile.module.css'
export default function MyProfile() {
    const modalRef = useRef()
    console.log(modalRef)
    const { handleLogout, verifyToken,loading,setLoading, usertokenData, isUserLoggedIn } = useContext(mycontext)
    const usertoken = localStorage.getItem("usertoken")


    useEffect(() => {
        let usertoken = localStorage.getItem('usertoken')
        verifyToken(usertoken)
    }, [])

    function handleModal(e) {
        // e.preventDefault()

        const modal = bootstrap.Modal.getInstance(modalRef.current)
        console.log(modal)
        modal.hide()

    }
    return (
        <>
        {!isUserLoggedIn && loading && <h2 style={{height:"100vh"}} className='d-flex justify-content-center align-items-center'>Loading......</h2>}

            {isUserLoggedIn &&
                <div className={style.profileContainer} style={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div className={style.profileBox}>
                        <div className={style.profileImgBox}>
                            <div className={style.profileImg}></div>
                        </div>
                        <div className={style.profileDetails}>
                            <h1 className={style.fullName}>{usertokenData.fullName}</h1>
                        </div>
                        <p className={style.requests}><button type='button' className={style.viewrequestsBtn} data-bs-toggle="modal" data-bs-target="#exampleModal">View Requests</button></p>
                        <div className={`${style.signOutContainer}`}>
                            <Link to="/" className={`${style.signOutBtn} `} onClick={handleLogout}>SIGN OUT</Link>
                        </div>

                    </div> </div> }
                    {/* {!isUserLoggedIn && loading &&
                <div className='text-center d-flex ' style={{ height: "90vh", justifyContent: "center", alignItems: "center" }}><Link to="/signin" className='btn btn-success '>Login</Link></div>
                    } */}
            

            {/* <!-- Modal --> */}
            <div className="modal" ref={modalRef} id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            {/* <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1> */}
                            <Link data-bs-dismiss="modal" className='text-dark'>
                                {/* <i class="fa-solid fa-paw fa-2xl"></i> */}
                                <i class="fa-solid fa-shield-cat fa-2xl"></i>
                            </Link>
                            <button type="button" className={`btn-close ${style.closeBtn}`} data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body d-flex justify-content-center gap-3">
                            <div>
                                <Link className={` ${style.requestsTraningBtn}`} to="/trainingplaceddata" onClick={handleModal}>Training</Link>
                            </div>
                            <div>
                                <Link className={`${style.requestsPetDaysCareBtn}`} type='button' to='/petcareplaceddata' onClick={handleModal}>PetDaysCare</Link>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className={style.closeBtnOne} data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

        </>


    )
}