import style from '../cssFiles/trainingData.module.css'

import { useState, useEffect, useContext, use } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { mycontext } from './Config'
import trainingDataImage from '../Images/trainingDataImage.jpg'
export default function TrainingData() {
    const navigate = useNavigate()
    const { handleAccept, isAdminLoggedIn, adminVerifyToken } = useContext(mycontext)
    const [trainingData, setTrainingData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchItem, setSearchItem] = useState("")
    const [pages, setPages] = useState(1)
    const admintoken = localStorage.getItem("admintoken")

    useEffect(() => {
        let admintoken = localStorage.getItem("admintoken")
        adminVerifyToken(admintoken)

    }, [admintoken])

    async function getTrainingData() {
        setIsLoading(true)
        let response = await fetch("http://localhost:5504/training", {
            method: "get"
        })
        let data = await response.json()
        setTrainingData(data)
        console.log(data)

        setIsLoading(false)
    }
    useEffect(() => {
        getTrainingData()
    }, [])

    const filteredData = trainingData.filter(data => data.petName.toLowerCase().startsWith(searchItem.toLowerCase().trim()))

    const totalPages = Array(Math.ceil(trainingData.length / 3)).fill(0)
    // console.log(totalPages.length>pages)
    console.log(pages === 1)

    return (
        <div className={style.mainContainer} style={{
            height: "95vh",
            backgroundImage: `url(${trainingDataImage})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            color: "white"
        }}>

            {isLoading &&
                <h1 className={style.loading}>Loadin....</h1>
            }
            {trainingData.length > 0 ? (
                <>
                    <h1 className={style.tableHeading}>Training Data</h1>
                    <form className={style.searchItemForm}>
                        <div className={style.searchItemBox}>
                            <input type='search' placeholder='Search Pet Name.....' value={searchItem} onChange={(e) => setSearchItem(e.target.value)} />
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </div>
                    </form>
                    {filteredData.length > 0 ? (
                        <><div className={style.tableContainer}>
                            <table style={{ width: "80%" }}>
                                <thead>
                                    <tr>
                                        <th style={{ padding: "30px 20px" }}>Id</th>
                                        <th>PetName</th>
                                        <th>PetAge</th>
                                        <th>PetBreed</th>
                                        <th>Gender</th>
                                        <th>trainingType</th>
                                        <th>mobile</th>
                                        {isAdminLoggedIn &&
                                            <><th>status</th><th colSpan={1}>Accept</th></>}
                                    </tr>
                                </thead>
                                {filteredData.slice(pages * 3 - 3, pages * 3).map((item, index) => (
                                    <tbody key={item._id}>
                                        <tr>
                                            <td style={{ backgroundColor: "rgb(35, 35, 35)", color: "white" }}>{(pages - 1) * 3 + index + 1}</td>
                                            <td>{item.petName}</td>
                                            <td>{item.petAge}</td>
                                            <td>{item.petBreed}</td>
                                            <td>{item.gender}</td>
                                            <td>
                                                {item.trainingType === 1 && "Beginner"}
                                                {item.trainingType === 2 && "Advanced"}
                                                {item.trainingType === 3 && "Specialized"}
                                            </td>
                                            <td>{item.mobile}</td>
                                            {isAdminLoggedIn &&
                                                <>
                                                    <td>{item.status === 0 ? "pending" : "accepted"}</td>
                                                    {item.status === 0 ?
                                                        <td className={style.acceptBtn}><Link onClick={() => handleAccept(item)} to="/trainingamount">Accept</Link></td> :
                                                        <td className={style.notAcceptedBtn}><Link to="/trainingData">Accepted</Link></td>}
                                                </>}
                                        </tr>
                                    </tbody>
                                ))}
                            </table>
                        </div>

                        </>
                    ) : <p className='text-center text-light'>No Results Found<b className='mx-2'>"{searchItem}"</b></p>}
                    {filteredData.length >0 &&
                    <div className={`${style.paginationContainer} d-flex justify-content-center `}>
                        <div className={style.previousBtnContainer}>
                            <button onClick={() => setPages((prev) => prev - 1)} disabled={pages === 1}><i class="fa-solid fa-backward"></i></button>
                        </div>
                        {totalPages.map((_, index) => (
                            <><button className={style.paginationindexes} style={{ backgroundColor: index + 1 == pages ? "rgb(165, 140, 76)" : "", color: index + 1 === pages ? "white" : "black" }} onClick={() => setPages((prev) => index + 1)}>{index + 1}</button></>
                        ))}
                        {totalPages.length > pages &&
                            <div className={style.forwardBtnContainer}>
                                <button onClick={() => setPages((prev) => prev + 1)}><i class="fa-solid fa-forward"></i></button>
                            </div>
                        }
                    </div>
}
                </>
            ) : <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>Training Request Empty</h1>}
        </div>
    )
}