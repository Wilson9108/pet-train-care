import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import style from '../cssFiles/homepage.module.css'
import videoSrc from '../videos/dogVideo2.mp4'
import { mycontext } from './Config'

export default function HomePage() {
    let {usertokenData,verifyToken} =  useContext(mycontext)
    let token = localStorage.getItem("usertoken")

    const redirect =usertokenData.role==="user"?"/training":"/signin";
    const petcareredirect =usertokenData.role === "user"?'/petcarerequest':'/signin'
    console.log(redirect)
    return (
        <>
        <div className={style.mainContainer}>
            <header>
                <video className={style.myVideo} src={videoSrc} width="100vw" height="100%" autoPlay loop muted
                 ></video>
                 <div className={style.headerContent}>
                    <h1>Welcome <br></br> to the family</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quibusdam ipsum corporis ratione, modi inventore, quis atque blanditiis sint quam cupiditate fugit dolore reiciendis saepe. Excepturi aperiam obcaecati quas quae?</p>
                    <Link to="" className={style.viewMoreBtn}>View More</Link>
                </div> 
            </header>

            {/* -------------------------------------------- */}
            <div className={style.petIconsCon} >
                <div className={style.petIconsBox}>
                    <div><i class="fa-solid fa-shield-dog"></i></div>
                    <div><i class="fa-solid fa-paw"></i></div>
                    <div><i class="fa-solid fa-bone"></i></div>
                    <div><i class="fa-solid fa-cat"></i></div>
                    <div><i class="fa-solid fa-horse"></i></div>
                    <div><i class="fa-solid fa-otter"></i></div>

                </div>

            </div>
            {/* ---------------------------------------------------------- */}
            <div className={style.cardAndImgCon}>
                <div className={style.imgCon}>
                    <img src='src/images/headerimageone.jpg'></img>
                </div>
                <div className={style.cardCon}>
                    <h1>Pets Bring So much joy to our live so lets return the favour</h1>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut rem
                        Vitae am cum iure fuga quis temporibus quam? Neque dolores obcaecati aut minima debitis repellat culpa, numquam rerum.</p>
                </div>
            </div>
            {/* ------------------------------------------------------ */}
            <div className={style.ourServiceCon}>
                <div className={style.serviceHeading}>
                    <h1 className={style.heading}>What We Offers</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla facere error doloribus! Iste,<br></br>i m dolor sit amet c Lorem ipsum dolor sit amet consectetur, adipisicing<br></br> elit. At expeantium soluta saepe. Corrupti.!</p>
                </div>
                <div className={style.ourServiceBox}>
                    <div className={style.imgBox}>
                        <div>
                            <div className={style.groomingImg}>
                                <img src='src/images/headerimagetwo.jpg' width="100%" height="100%"></img>
                            </div>
                            <h3>Grooming</h3>
                            <Link to={petcareredirect}>Grooming</Link>
                        </div>
                    </div>
                    <div className={style.imgBox}>
                        <div>
                            <div className={style.trainingImg}>
                                <img src='src/images/headerimagethree.jpg' width="100%" height="100%" />
                            </div>
                            <h3>Training</h3>
                            <Link to={redirect}>Training</Link>
                        </div>
                    </div>
                    <div className={style.imgBox}>
                        <div>
                            <div className={style.daysCareImg}>
                                <img src='src/images/headerimagefour.jpg' width="100%" height="100%" />
                            </div>
                            <h3>Days Care Boarding</h3>
                            <Link to={petcareredirect}>DaysCare</Link>
                        </div>
                    </div>
                </div>
            </div>



            {/* ------------------------------------------------ */}
            <div className={style.cardTwoAndImgCon}>
                <div className={style.cardConTwo}>
                    <h3>We Love Our Job</h3>
                    <h2>Pet Caring   is Big And Good Deed</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum qui corrupti totam harum sint tempora dolore quidem, voluptatibus veritatis quibusdam aperiam pariatur provident voluptatem. Voluptatum quisquam eum ratione optio suscipit!</p>

                </div>
                <div className={style.imgConTwo}>
                    <img src='src/images/headerimagefive.jpg'></img>
                </div>
            </div>

            {/* --------------------------------------------------------- */}
            <div className={style.cardThreeAndImgCon}>
            <div className={style.imgConThreeOne}>
                    <img src='src/images/headerimagesix.jpg'></img>
                </div>
                <div className={style.cardConThree}>
                    <h2>Choosing Right Food For Your Pet</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum qui corrupti totam harum sint tempora dolore quidem, voluptatibus veritatis quibusdam aperiam pariatur provident voluptatem. Voluptatum quisquam eum ratione optio suscipit!</p>

                </div>
                <div className={style.imgConThreeTwo}>
                    <img src='https://i.pinimg.com/1200x/ff/70/a8/ff70a89daf8a8caa532229e5d8793197.jpg'></img>
                </div>

            </div>
            </div>

        </>
    )

}
