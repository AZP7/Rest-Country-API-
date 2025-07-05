import React, { useEffect, useRef, useState } from 'react'
import '../section/Section.css'


function Section({country, isLoading, error,setError}) {

  const[showfilter,setShowfilter] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);

  const [userSearch,setUserSearch]  = useState('')
  const ItemsPerPage = 10; // Number of items to display per page

  const [nations,setNations] = useState(country)
  useEffect(()=>{
    if(country && country.length>0){
      setNations(country)
    }
  },[country])

  const startIndex = (currentPage -1) * ItemsPerPage;
  const endIndex = startIndex + ItemsPerPage

  const CurrentItems = nations.slice(startIndex, endIndex);
  const TotalPage = Math.ceil(nations.length / ItemsPerPage);

  const HandleFilter = ()=>{
    setShowfilter(prev=>!prev)
  }
const FilterRegion = (region) => {
  const filtered = country.filter(nation =>
    nation.region.toLowerCase().includes(region.toLowerCase())
  );
  setNations(filtered);
  setUserSearch('')
  setError(false)
  setShowfilter(false)
}; 
const allNations = ()=>{
  setNations(country)
  setUserSearch('')
  setError(false)
  setShowfilter(false)
}
const handleSearch = (searchTerm)=>{

    if(searchTerm.length>0){
        const search = searchTerm.toLowerCase()

        const filtered = country.filter(item=>{

          const name = item.name.common || '';
          const OfficalName = item.name.official || '';
          const capital = item.capital[0]|| '';
          const code = item.cca2 || '';

          return(
            name.toLowerCase().includes(search) ||
            OfficalName.toLowerCase().includes(search)||
            capital.toLowerCase().includes(search)||
            code.toLowerCase().includes(search)
          )
        })
        if(filtered.length >0){
          setNations(filtered)
        }
        else{
            setError("No country found!")
        }
    }
    else{
      setError("Please type a country")
      setNations(country)
    }
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
              <i onClick={()=>{handleSearch(userSearch)}} className="fa-solid fa-magnifying-glass border-3 border p-3 rounded rounded-3 position-absolute"></i>
              <input type="text" value={userSearch} onChange={e => setUserSearch(e.target.value)} className='w-100 rounded rounded-3 p-4 shadow border-0' placeholder='Search for a country' />

              {
                error && <div className='error_container d-flex justify-content-center align-items-center w-100 h-100'>
                  <p className='text-danger fw-bold'>{error}</p>
                </div>
              }


            </div>

            <div onClick={HandleFilter} className="filter w-50 mt-5 fw-semibold rounded rounded-2 shadow-sm d-flex align-items-center border p-3" >
              Filter by Region
              <i className="fa-solid fa-angle-down fw-semibold ms-4"></i>
            </div>
          {
            showfilter ? 
            <ul className='filter_option position-absolute w-50 mt-3 rounded p-0 shadow d-flex flex-column'>
              <li onClick={allNations} className='list-unstyled  p-2 w-100 fw-medium'>All</li>
              <li onClick={()=>FilterRegion("Africa")} className='list-unstyled  p-2 w-100 fw-medium'>Africa</li>
              <li onClick={()=>FilterRegion("America")} className='list-unstyled w-100 p-2 fw-medium'>America</li>
              <li onClick={()=>FilterRegion("Asia")} className='list-unstyled w-100 p-2 fw-medium'>Asia</li>
              <li onClick={()=>FilterRegion("Europe")} className='list-unstyled w-100 p-2 fw-medium'>Europe</li>
              <li onClick={()=>FilterRegion("Oceania")} className='list-unstyled w-100 p-2 fw-medium'>Oceania</li>
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
                            onClick={() => {
                              setCurrentPage(pageNum);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
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
