import React, { useState } from 'react'
import '../section/Section.css'


function Section({country, isLoading, error}) {

  const[showfilter,setShowfilter] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const ItemsPerPage = 10; // Number of items to display per page

  const startIndex = (currentPage -1) * ItemsPerPage;
  const endIndex = startIndex + ItemsPerPage

  const CurrentItems = country.slice(startIndex, endIndex);
  const TotalPage = Math.ceil(country.length / ItemsPerPage);

  const HandleFilter = ()=>{
    setShowfilter(prev=>!prev)
  }

  return (
    <>
    <header className='w-100 shadow d-flex p-3 pb-4  pt-4 align-items-center justify-content-between'>
        <span className='fw-bold'>Where in the world?</span>
        <div className="switch_m ">
            <i className="fa-regular fa-moon "></i>
            <span className='ms-3 fw-semibold'>Dark Mode</span>
        </div>
    </header>

    <section className=''>
          <div className="search_filter position-relative p-3 d-flex flex-column">
            
            <div className="search position-relative">
              <i className="fa-solid fa-magnifying-glass position-absolute"></i>
              <input type="text" className='w-100 rounded rounded-3 p-3 ps-5 shadow border-0' placeholder='Search for a country' />
            </div>

            <div onClick={HandleFilter} className="filter w-50 mt-5 fw-semibold rounded rounded-2 shadow-sm d-flex align-items-center border p-3" >
              Filter by Region
              <i className="fa-solid fa-angle-down fw-semibold ms-4"></i>
            </div>
          {
            showfilter ? 
            <ul className='filter_option position-absolute w-50 mt-3 rounded p-0 shadow d-flex flex-column'>
              <li className='list-unstyled  p-2 w-100 fw-medium'>Africa</li>
              <li className='list-unstyled w-100 p-2 fw-medium'>America</li>
              <li className='list-unstyled w-100 p-2 fw-medium'>Asia</li>
              <li className='list-unstyled w-100 p-2 fw-medium'>Europe</li>
              <li className='list-unstyled w-100 p-2 fw-medium'>Oceania</li>
            </ul>
            :
            null
            }
          </div>
          {
            isLoading && <div className='loading_container d-flex justify-content-center align-items-center w-100 h-100'>
              Loading...
            </div>
          }
          {
            error && <div className='error_container d-flex justify-content-center align-items-center w-100 h-100'>
              <p className='text-danger fw-bold'>{error}</p>
            </div>
          }
                <div className="nation_container w-100 d-flex flex-column align-items-center">
                  {
                    CurrentItems.map((data, index) => {
                      return (
                          <div key={index}  className="nation border rounded rounded-3 shadow overflow-hidden mb-3 d-flex flex-column">
                            <img src={data.flags.png} alt="National Flag" />
                            <h1 className='ps-3 mt-4 fw-bold'>{data.name.common}</h1>
                            <p className='ps-3 mb-1 fw-medium'>Population: <span className='fw-normal'>{data.population}</span></p>
                            <p className='ps-3 mb-1 fw-medium'>Region:     <span className='fw-normal'>{data.region}</span></p>
                            <p className='ps-3 mb-4 fw-medium'>Capital:    <span className='fw-normal'>{data.capital ? data.capital[0] : 'N/A'}</span></p>
                          </div>
                      )
                    })
                  }
                    <div className="pagination d-flex flex-wrap justify-content-center align-items-center mt-4">
                      {[...Array(TotalPage)].map((_, index) => {
                        const pageNum = index + 1;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`btn mt-1 ms-1 btn-primary ${pageNum === currentPage ? 'active' : ''}`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                  </div>
    </section>
    </>

)
}

export default Section
