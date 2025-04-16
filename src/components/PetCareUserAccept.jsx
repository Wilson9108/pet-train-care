import { useState, useEffect } from 'react'

import style from '../cssFiles/trainingData.module.css'

import petCareAcceptImage from '../Images/petCareAcceptImage.jpg'

export default function PetCareUserAccept() {
    const [acceptData, setAcceptData] = useState([])
    const [searchItem, setSearchItem] = useState("")
    const [pages, setPages] = useState(1)

    async function fetchUserAcceptAndReject() {
        let response = await fetch("http://localhost:5504/petdayscare/response", {
            method: "get"
        })

        console.log(response)
        let data = await response.json()
        console.log(data)
        setAcceptData(data)
    }


    useEffect(() => {

        fetchUserAcceptAndReject()
    }, [])


    const statusOne = acceptData.filter(data => data.petcareandamounts.status === 1)
    console.log(statusOne)
    const filteredData = statusOne.filter(data => data.petName.toLowerCase().startsWith(searchItem.toLowerCase().trim()))
    const totalPages = Array(Math.ceil(statusOne.length / 3)).fill(0)
    // console.log(totalPages.length>pages)
    console.log(pages === 1)



    return (

        <>
            <div classsName={style.mainContainer} style={{
                height: "95vh",
                overflowY: acceptData.length > 8 ? "scroll" : "none",
                backgroundImage: `url(${petCareAcceptImage})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
                color: "white"
            }}>
                {acceptData.length > 0 ?
                    <><h1 className={style.tableHeading}>User Accepted Pet Days Care Data</h1>
                        <form className={style.searchItemForm}>
                            <div className={style.searchItemBox}>
                                <input type='search' placeholder='Search Pet Name.....' value={searchItem} onChange={(e) => setSearchItem(e.target.value)} />
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </div>
                        </form>
                        {filteredData.length > 0 ? (
                            <div className={style.tableContainer}>
                                <table style={{ width: "80%" }}>
                                    <thead>
                                        <tr>
                                            <th style={{ padding: "30px 20px" }}>Id</th>
                                            <th>petOwnerName</th>
                                            <th>PetName</th>
                                            <th>PetAge</th>
                                            <th>PetBreed</th>
                                            <th>Gender</th>
                                            <th>MobileNumber</th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>
                                    {filteredData.slice(pages*3-3,pages*3).map((item, index) => (
                                        <tbody key={item._id}>
                                            <tr>
                                                {item.petcareandamounts.status === 1 && (
                                                    <>
                                                        <td style={{ backgroundColor: "rgb(35, 35, 35)", color: "white" }}>{(pages - 1) * 3 + index + 1}</td>
                                                        <td>{item.petcareandusers.fullName}</td>
                                                        <td>{item.petName}</td>
                                                        <td>{item.petBreed}</td>
                                                        <td>{item?.petcareandamounts?.petAmount}</td>
                                                        <td>{item.gender}</td>
                                                        <td>{item.mobile}</td>
                                                        <td>{item?.petcareandamounts?.petDescription}</td>
                                                    </>
                                                )}
                                            </tr>
                                        </tbody>
                                    ))}
                                </table>
                            </div>
                        ) : <p className='text-center text-dark'>No Results Found<b className='mx-2'>"{searchItem}"</b></p>}
                        {filteredData.length > 0 &&
                            <div className={`${style.paginationContainer} d-flex justify-content-center `}>
                                <div className={style.previousBtnContainer}>
                                    <button onClick={() => setPages((prev) => prev - 1)} disabled={pages === 1}><i class="fa-solid fa-backward"></i></button>
                                </div>
                                {totalPages.map((_, index) => (
                                    <><button className={style.paginationindexes} style={{ backgroundColor: index + 1 == pages ? "rgb(165, 140, 76)" : "", color: index + 1 === pages ? "white" : "black" }} onClick={() => setPages(index + 1)}>{index + 1}</button></>
                                ))}
                                {totalPages.length > pages &&
                                    <div className={style.forwardBtnContainer}>
                                        <button onClick={() => setPages((prev) => prev + 1)}><i class="fa-solid fa-forward"></i></button>
                                    </div>
                                }
                            </div>
                        }
                    </>

                    : <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>Pet Days Care Empty</h1>}

            </div>
        </>
    )
}