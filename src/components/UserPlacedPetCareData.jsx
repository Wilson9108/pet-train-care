import { useState, useEffect, useContext } from 'react'
import { mycontext } from './Config'
import { Link } from 'react-router-dom'
import style from '../cssFiles/trainingData.module.css'
import placedPetCareImage from '../Images/placedPetCareImage.jpg'
export default function UserPlacedPetCareData() {
    const { usertokenData, userId } = useContext(mycontext)
    console.log(usertokenData)
    console.log(usertokenData.userId)
    const [responseData, setResponseData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchItem, setSearchItem] = useState("")
    const [pages,setPages]=useState(1)

    async function getResponseData() {
        setIsLoading(true)
        let response = await fetch(`http://localhost:5504/petdayscare/petcareplaceddata/${userId}`, {
            method: "get"
        })
        let data = await response.json()
        console.log(data)
        let trainingAmountData = data.map(item => item)
        console.log(trainingAmountData)
        setResponseData(trainingAmountData)
        setIsLoading(false)
    }
    useEffect(() => {
        if (usertokenData && usertokenData.userId) {
            getResponseData()
        } else {
        }
    }, [usertokenData])

    async function handleUserAccept(item) {
        let response = await fetch(`http://localhost:5504/trainingamount/statusaccept/${item.trainingamountdata._id}`, {
            method: "put"
        })
        console.log(response)
        getResponseData()
    }
    async function handleUserReject(item) {
        console.log("reject", item)
        let response = await fetch(`http://localhost:5504/trainingamount/statusreject/${item.trainingamountdata._id}`, {
            method: "put"
        })
        console.log(response)
        getResponseData()
    }

    const filteredData = responseData.filter(data => data.petName.toLowerCase().startsWith(searchItem.toLowerCase().trim()))
    const totalPages = Array(Math.ceil(responseData.length/3)).fill(0)
    // console.log(totalPages.length>pages)
    console.log(pages ===1)

    return (
        <>

            <div style={{
                height: "100vh", overflowY: responseData.length > 8 ? "scroll" : "none",
                backgroundImage: `url(${placedPetCareImage})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
                color: "gray"
            }} className={style.mainTableContainer}>
                {isLoading &&
                    <h1 className={style.loading}>Loading....</h1>
                }
                {responseData.length > 0 ?
                    <>
                        <h1 className={style.tableHeading} >Placed Pet CARE Data</h1>
                        <form className={style.searchItemForm}>
                            <div className={style.searchItemBox}>
                                <input type='search' placeholder='Search Pet Name.....' value={searchItem} onChange={(e) => setSearchItem(e.target.value)} />
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </div>
                        </form>
                        {filteredData.length > 0 ? (
                            <div className={style.tableContainer}>
                                <table style={{ width: "60%" }}>
                                    <thead>
                                        <tr>
                                            <th style={{ padding: "30px 20px" }}>Id</th>
                                            <th>Your Name</th>
                                            <th>petName</th>
                                            <th>petAge</th>
                                            <th>petBreed</th>
                                            <th>petGender</th>
                                            <th>Description</th>
                                            <th>MobileNumber</th>
                                        </tr>
                                    </thead>
                                    {filteredData.slice(pages*3-3,pages*3).map((item, index) => (
                                        <tbody key={item._id}>
                                            <tr>
                                            <td style={{ backgroundColor: "rgb(35, 35, 35)", color: "white" }}>{(pages-1)*3+index+1}</td>
                                            <td>{item.petcareandusers.fullName}</td>
                                                <td>{item.petName}</td>
                                                <td>{item.petAge}</td>
                                                <td>{item.petBreed}</td>
                                                <td>{item.gender}</td>
                                                <td>{item.description}</td>
                                                <td>{item.mobile}</td>
                                            </tr>
                                        </tbody>
                                    ))}
                                </table>
                            </div>
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
                    : <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh",color:"black" }}>Your are Not Placed Any Requests</h1>}
            </div>
        </>
    )
}