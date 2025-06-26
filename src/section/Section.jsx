import React, { useState } from 'react'
import '../section/Section.css'

function Section() {
  const[hover,setHover] = useState(false)



  return (
    <>
    <header className='w-100 shadow d-flex p-3 pb-4  pt-4 align-items-center justify-content-between'>
        <span className='fw-bold'>Where in the world?</span>
        <div className="switch_m ">
            <i className="fa-regular fa-moon "></i>
            <span className='ms-3 fw-semibold'>Dark Mode</span>
        </div>
    </header>

    <section>
          <div className="search_filter p-3 d-flex flex-column">
            
            <div className="search border position-relative">
              <i className="fa-solid fa-magnifying-glass position-absolute"></i>
              <input type="text" className='w-100 p-3 ps-5 shadow border-0' placeholder='Search for a country' />
            </div>

            <div className="filter mt-5 fw-semibold rounded rounded-2 shadow-sm d-flex align-items-center border p-3" onMouseEnter={()=>setHover(true)}>
              Filter by Region
              <i className="fa-solid fa-angle-down fw-semibold ms-4"></i>
            </div>
            {
              
            }
            <ul className='filter_option mt-3 pb-3 shadow-sm border d-flex flex-column'>
              <li className='list-unstyled fw-medium'>Africa</li>
              <li className='list-unstyled fw-medium'>America</li>
              <li className='list-unstyled fw-medium'>Asia</li>
              <li className='list-unstyled fw-medium'>Europe</li>
              <li className='list-unstyled fw-medium'>Oceania</li>
            </ul>

          </div>
    </section>
    </>

)
}

export default Section
