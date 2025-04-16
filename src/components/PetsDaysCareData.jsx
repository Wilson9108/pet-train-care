import style from '../cssFiles/trainingData.module.css'

import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { mycontext } from './Config'
import petCareDatImage from '../Images/petCareDataImage.jpg'
export default function PetsDaysCareData() {
    const navigate = useNavigate()
    const { handlePetCareAccept, isUserLoggedIn, isAdminLoggedIn } = useContext(mycontext)
    const [petCareData, setPetCareData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchItem, setSearchItem] = useState("")
    const [pages, setPages] = useState(1)

    async function getPetCareData() {
        setIsLoading(true)
        let response = await fetch("http://localhost:5504/petdayscare", {
            method: "get"
        })
        let data = await response.json()
        setPetCareData(data)
        console.log(data.length)
        setIsLoading(false)
    }
    console.log(petCareData.filter(item => item.petName === searchItem))
    useEffect(() => {
        getPetCareData()
    }, [])
    // console.log("2025-04-25T00:00:00.000Z".split("T")[0])
    const filteredData = petCareData.filter(data => data.petName.toLowerCase().startsWith(searchItem.toLowerCase().trim()))
    const totalPages = Array(Math.ceil(petCareData.length / 3)).fill(0)
    // console.log(totalPages.length>pages)
    console.log(pages === 1)



    return (
        <>
            <div className={style.mainContainer} style={{
                height: "95vh", overflowY: petCareData.length > 8 ? "scroll" : "none",
                backgroundImage: `url(${petCareDatImage})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
                color: "white"
            }}>

                {isLoading &&
                    <h1 className={style.loading}>Loadin....</h1>
                }

                {petCareData.length > 0 ? (
                    <><h1 className={style.tableHeading}>Pet Days Care Data</h1>
                        <form className={style.searchItemForm}>
                            <div className={style.searchItemBox}>
                                <input type='search' placeholder='Search Pet Name.....' value={searchItem} onChange={(e) => setSearchItem(e.target.value)} />
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </div>
                        </form>
                        <div className={style.tableContainer}>
                            {filteredData.length > 0 ? (
                                <table style={{ width: "60%", overflowY: petCareData.length > 3 ? "scroll" : "none" }} className={style.petCareDataTable}>
                                    <thead>
                                        <tr>

                                            <th style={{ padding: "30px 20px" }}>Id</th>
                                            <th style={{ padding: "30px 8px" }}>PetName</th>
                                            <th style={{ padding: "30px 8px" }}>PetAge</th>
                                            <th style={{ padding: "30px 8px" }}>PetBreed</th>
                                            <th style={{ padding: "30px 8px" }}>Gender</th>
                                            <th style={{ padding: "30px 8px" }}>StartDate</th>
                                            <th style={{ padding: "30px 8px" }}>EndDate</th>
                                            <th style={{ padding: "30px 8px" }}>Medication</th>
                                            <th style={{ padding: "30px 8px" }}>Food</th>
                                            <th style={{ padding: "30px 8px" }}>Grooming</th>
                                            <th style={{ padding: "30px 8px" }}>Description</th>
                                            <th style={{ padding: "30px 8px" }}>mobile</th>
                                            {isAdminLoggedIn &&
                                                <>
                                                    <th style={{ padding: "30px 8px" }}>Status</th>
                                                    <th style={{ padding: "30px 8px" }}>accept</th>
                                                    {/* <th colSpan={1}>Rejectt</th> */}
                                                </>
                                            }
                                        </tr>
                                    </thead>

                                    <>
                                        {filteredData.slice(pages * 3 - 3, pages * 3).map((item, index) => (
                                            <tbody key={item._id}>
                                                <tr key={item._id}>
                                                    <td style={{ backgroundColor: "rgb(35, 35, 35)", color: "white" }}>{(pages - 1) * 3 + index + 1}</td>
                                                    <td >{item.petName}</td>
                                                    <td >{item.petAge}</td>
                                                    <td >{item.petBreed}</td>
                                                    <td >{item.gender}</td>
                                                    <td >{item.startDate.split("T")[0]}</td>
                                                    <td >{item.endDate.split("T")[0]}</td>
                                                    <td > {item.medication}</td>
                                                    <td >{item.food}</td>
                                                    <td >{item.grooming}</td>
                                                    <td >{item.description.slice(0, 15)}</td>
                                                    <td >{item.mobile}</td>
                                                    {isAdminLoggedIn &&
                                                        <>
                                                            <td>{item.status === 0 ? "pending" : "accepted"}</td>
                                                            {item.status === 0 ? (
                                                                <td className={style.acceptBtn} ><Link onClick={() => handlePetCareAccept(item)} to="/petcareamount">Accept</Link></td>) : (
                                                                <td className={style.notAcceptedBtn} ><Link to="/petcaredata">Accepted</Link></td>)
                                                            }
                                                        </>
                                                    }
                                                </tr>
                                            </tbody>

                                        ))}
                                    </>

                                </table>
                            ) : <p className='text-center text-dark'>No Results Found<b className='mx-2'>"{searchItem}"</b></p>}
                        </div>
                        {filteredData.length > 0 &&
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
                ) : <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>Pet Days Care Request Empty</h1>}
            </div>
        </>
    )
}