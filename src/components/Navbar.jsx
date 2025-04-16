import { Link } from 'react-router-dom'
import { mycontext } from './Config'
import { useContext } from 'react'
import style from '../cssFiles/navbar.module.css'
export default function Navbar() {
    const { isUserLoggedIn, isAdminLoggedIn } = useContext(mycontext)

    return (
        <>
            <nav className="navbar  navbar-expand-lg   position-sticky top-0 z-1" >
                <div className="container-fluid ">
                    <Link className="navbar-brand " to="/" >
                    {/* <i class="fa-solid fa-paw fa-2xl"></i> */}
                    <i class="fa-solid fa-shield-cat fa-2xl"></i>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            {!isUserLoggedIn && !isAdminLoggedIn &&
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
}

                            <>
                                {!isUserLoggedIn && !isAdminLoggedIn &&
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link active" aria-current="page" to="/signup">signup</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/signin">Signin</Link>
                                        </li>
                                    </>
                                }
                                {isAdminLoggedIn &&
                                    <>
                                        
                                        <li class="nav-item dropdown">
                                            <Link class="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                User Requested
                                            </Link>
                                            <ul class="dropdown-menu">
                                                <li><Link class="dropdown-item" to="/petcaredata">PetCareData</Link></li>
                                                <li><Link class="dropdown-item" to="/trainingData">TrainingCareData</Link></li>
                                            </ul>
                                        </li>

                                        <li class="nav-item dropdown">
                                            <Link class="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                User Accepted
                                            </Link>
                                            <ul class="dropdown-menu">
                                                <li><Link class="dropdown-item" to="/petcareuseraccept">PetcareAccepted</Link></li>
                                                <li><Link class="dropdown-item" to="/traininguseraccept">Training Accepted</Link></li>
                                            </ul>
                                        </li>
                                        <li className='nav-item'>
                                            <Link className='nav-link' to="/adminprofile">profile</Link>
                                        </li>
                                    </>
                                }
                                {isUserLoggedIn &&
                                    <>
                                        <li className='nav-item'>
                                            <Link className='nav-link' to="/training">Training Request</Link>
                                        </li>


                                        <li className="nav-item">
                                            <Link className="nav-link" to="/petcarerequest">petCareRequest</Link>
                                        </li>

                                        <li class="nav-item dropdown">
                                            <Link class="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Response
                                            </Link>
                                            <ul class="dropdown-menu">
                                                <li><Link class="dropdown-item" to="/petcareresponse">PetCareResponse</Link></li>
                                                <li><Link class="dropdown-item" to="/trainingresponse">TrainingResponse</Link></li>
                                            </ul>
                                        </li>

                                        <li className="nav-item">
                                            <Link className="nav-link" to="/profile">Profile</Link>
                                        </li>

                                    </>
                                }



                            </>

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}