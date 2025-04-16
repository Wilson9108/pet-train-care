import {Link} from 'react-router-dom'
import style from '../cssFiles/footer.module.css'


export default function Footer(){
    return(
        <>
        <footer>
        <div className={style.footerCardOne}>
            <div className={style.imgCon}>
            <img src='src/images/footerimageone.jpg'/>
            <div className={style.iconsCon}>
            </div>
            </div>
        </div>

        <div className={style.footerCardTwo}>
            {/* <h2>Services</h2> */}
            <ul>
                <li>Services</li>
                <li>Training</li>
                <li>Gromming</li>
                <li>daysCare</li>
            </ul>
        </div>
        <div className={style.footerCardThree}>
        {/* <h2>our Customers</h2> */}
        <ul>
            <li>Our Customers</li>
                <li>wilson</li>
                <li>harika</li>
                <li>sumanth</li>
            </ul>
        </div>
        <div className={style.footerCardFour}>
        <h2>Contact Us</h2>
        <p>If you have any questions or  <br></br>
        need help, call us  any time
        </p>
        <h3 className='text-warning'>12414555252</h3>
        <Link  to="" className={style.getStarted}>Get Started</Link>
        </div>
        </footer>
        </>
    )
}