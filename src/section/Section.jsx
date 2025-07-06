import React, { useEffect, useState } from 'react'
import '../section/Section.css'
import useIsLargeScreen from '../Responsive/Responsive';


function Section({country, isLoading, error,setError}) {

  const[showfilter,setShowfilter] = useState(false)
  const [isDark, setIsDark] = useState(false);
  const [details,setDetails] = useState(false)
  const [nations,setNations] = useState([])
  const [countryData, setCountryData] = useState([]);
  const [userSearch,setUserSearch]  = useState('')
  const isLarge = useIsLargeScreen(); // Hook to check if the screen is large
  
  
  const ItemsPerPage = 10; // Number of items to display per page
  
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage -1) * ItemsPerPage;
  const endIndex = startIndex + ItemsPerPage
  const TotalPage = Math.ceil(nations.length / ItemsPerPage);
  const CurrentItems = nations.slice(startIndex, endIndex);

const ViewDetails = (id) => {
  const filtered = nations.filter(nation => nation.id === id);
  setCountryData (filtered);
  setDetails(true);
  setShowfilter(false);
};

const addID = ()=>{
      setNations(
      country.map((nation, index) => ({
        ...nation,
        id: index + 1 ,         // Numeric ID (e.g., 1, 2, 3...)
        isActive: false        // Default isActive flag
      }))  
    )
}
const addPropsToArray = (array) =>
  array.map((nation, index) => ({
    ...nation,
    id: index + 1,
    isActive: false
  }));

useEffect(() =>addID(), [country]);


const HandleFilter = ()=>{
    setShowfilter(prev=>!prev)
  }
const FilterRegion = (region) => {
  
  const updatedNations = addPropsToArray(country);
  const filtered =  updatedNations.filter(nation =>
    nation.region.toLowerCase().includes(region.toLowerCase())
    );
    setNations(filtered);
    // setRegionCountry(filtered);
    setUserSearch('')
    setError(false)
    setShowfilter(false)
    setDetails(false);
}; 
const allNations = ()=>{
  addID()
  setUserSearch('')
  setError(false)
  setShowfilter(false)
  setDetails(false);
}

const handleSearch = (searchTerm)=>{

    if(searchTerm.length>0){
        const search = searchTerm.toLowerCase()

        const filtered = nations.filter(item=>{

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
      // setNations(country)
    }
}
const setBackToDefault = ()=>{
  // setNations(country)
  addID()
  setDetails(false);

}

;return (
    <>
    <header className='w-100 shadow d-flex p-3 pb-4 pt-4 align-items-center justify-content-between'
      style={{ backgroundColor: isDark ? 'hsl(209, 23%, 22%)' : '#fff', color: isDark ? '#fff' : '#000' }}
    >
        <span className='fw-bold'
        style={{ fontSize:'1.2 em'}}
        >Where in the world?</span>
        <div className="switch_m ">
          {
            isDark ?
            <i onClick={()=>setIsDark(false)} className="dark_light fa-regular fa-moon "></i>
          :
            <i onClick={()=>setIsDark(true)} className="dark_light fa-solid fa-sun"></i>
          }
            <span className='ms-3 fw-semibold'>Dark Mode</span>
        </div>
    </header>

    <section className=''>
          <div className="search_filter position-relative p-3 d-flex flex-column"
            style={{ backgroundColor: isDark ? 'hsl(207, 26%, 17%)' : '#fff', color: isDark ? '#fff' : '#000' }}>
              {
                details ?
                <button onClick={setBackToDefault} className={`default_btn btn border shadow rounded-0 shadoow w-25`}
                style={{ backgroundColor: isDark ? '#2b3945' : '#fff', color: isDark ? '#fff' : '#000'  }}
                ><i className="fa-solid fa-arrow-left me-3"></i>Back</button> 
                :
                <>
                <div className="search position-relative">
                    {
                      isLarge ?

                       <div className="search_filter d-flex justify-content-between"
                       style={{ backgroundColor: isDark ? 'hsl(207, 26%, 17%)' : '#fff', color: isDark ? '#fff' : '#000' ,width: '100%' }}>

                            <i className="fa-solid fa-magnifying-glass position-absolute" style={{left:'10px',width:'30px'}}
                            ></i>
                            <input
                             type="text" className='rounded p-1 ps-5 border-0 shadow'
                            style={{width:"30%",outline:"none",backgroundColor: isDark ? 'hsl(209, 23%, 22%)' : '#fff'}} />

                          <div onClick={HandleFilter}
                              className="filter ps-2 fw-semibold rounded rounded-2 shadow-sm pt-3 d-flex align-items-center z-0 " 
                              style={{width:'15%',fontSize:'.7rem',height:'40px',backgroundColor: isDark ? 'hsl(209, 23%, 22%)' : '#fff', color: isDark ? '#fff' : '#000' }}
                              >
                              <p> Filter by Region</p>
                               <i className="fa-solid fa-angle-down ms-3 fw-semibold z-0"style={{fontSize:'.7rem',}}></i>

                          </div>

                       </div>
                       
                       
                       :
                    <>
                        <i onClick={()=>{handleSearch(userSearch)}} className="fa-solid fa-magnifying-glass border-3 border p-2 rounded rounded-3 position-absolute"></i>
                        <input type="text" 
                        srtyle={{backgroundColor: isDark ? 'hsl(207, 26%, 17%)' : '#fff', color: isDark ? '#fff' : '#000' }}
                        value={userSearch} onChange={e => setUserSearch(e.target.value)} className='w-100 rounded rounded-3 p-3 shadow border-0' placeholder='Search for a country' />
                    </>
                    }
                </div>
                  {
                    error && <div className='error_container mt-1 d-flex justify-content-center align-items-center w-100 h-100'>
                      <p className='text-danger fw-bold'>{error}</p>
                    </div>
                  }
                  {
                    isLarge ? null :
                    <div onClick={HandleFilter}
                    className="filter mt-2 fw-semibold rounded rounded-2 shadow-sm d-flex align-items-center border p-3" 
                    style={{width:'40%',fontSize:'.7rem'}}
                    >
                    Filter by Region
                        <i className="fa-solid fa-angle-down fw-semibold ms-4"></i>
                    </div>
                  }
                </>
              }
            
          {
              showfilter ? 
              <ul className='filter_option position-absolute w-50 mt-3 rounded p-0 shadow d-flex flex-column'
                style={{ backgroundColor: isDark ? 'hsl(209, 23%, 22%)' : '#fff', color: isDark ? '#fff' : '#000',cursor: showfilter ? 'pointer' : 'none' }}>
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
                <div className="nation_container w-100 d-flex justify-content-evenly align-items-center flex-wrap"
                  style={{ backgroundColor: isDark ? 'hsl(207, 26%, 17%)' : '#fff', color: isDark ? '#fff' : '#000' }}>

                    {
                      details ?
                        countryData.map((nation) =>(
                          <div  key={nation.id} className={`nation_1 shadow overflow-hidden mb-3 d-flex flex-column pb-3`}>
                            <img src={nation.flags.png} alt="National Flag"
                            style={{boxShadow: isLarge ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none' }}
                            />
                            {
                              isLarge? 
                              <div className="about">

                                <div className="common_Name  ">
                                  <h1 className='col-10 text-left mb-3'>{nation.name.common}</h1>
                                  <p className='fw-bold col-10 text-left'>Native Name:      <span className='fw-normal'> { nation.name.nativeName ? Object.values(nation.name.nativeName)[0]?.common || "N/A" : "N/A"}</span></p>
                                  <p className='fw-bold col-10 text-left'>Population:       <span className='fw-normal'>{nation.population ? nation.population :"N/A"}</span> </p>
                                  <p className='fw-bold col-10 text-left'>Region:           <span className='fw-normal'>{nation.region ? nation.region :"N/A"}</span> </p>
                                  <p className='fw-bold col-10 text-left'>Sub Region:       <span className='fw-normal'>{nation.subregion ? nation.subregion : " N/A"}</span> </p>
                                  <p className='fw-bold col-10 text-left mb-3'>Capital:          <span className='fw-normal'>{nation.capital ? nation.capital[0] : "N/A"}</span> </p>
                                </div>
                                <div className="other_details pt-5">
                                  <p className='fw-bold col-10 text-left mt-3'>Top Level Domain: <span className='fw-normal'>{nation.cca2 ? nation.cca2 : "N/A"}</span></p>
                                  <p className='fw-bold col-10 text-left'>Currencies:       <span className='fw-normal'>{nation.currencies ? Object.values(nation.currencies).map(c => c.name).join(', ') : "N/A"}</span></p>
                                  <p className='fw-bold col-10 text-left'>Languages:        <span className='fw-normal'>{nation.languages ? Object.values(nation.languages).join(', ') : "N/A"}</span> </p>
                                </div>
                              </div> 
                              :
                              <>
                                  <h1 className='col-10 text-left mt-3'>{nation.name.common}</h1>
                                  <p className='fw-bold col-10 text-left'>Native Name:      <span className='fw-normal'> { nation.name.nativeName ? Object.values(nation.name.nativeName)[0]?.common || "N/A" : "N/A"}</span></p>
                                  <p className='fw-bold col-10 text-left'>Population:       <span className='fw-normal'>{nation.population ? nation.population :"N/A"}</span> </p>
                                  <p className='fw-bold col-10 text-left'>Region:           <span className='fw-normal'>{nation.region ? nation.region :"N/A"}</span> </p>
                                  <p className='fw-bold col-10 text-left'>Sub Region:       <span className='fw-normal'>{nation.subregion ? nation.subregion : " N/A"}</span> </p>
                                  <p className='fw-bold col-10 text-left mb-3'>Capital:          <span className='fw-normal'>{nation.capital ? nation.capital[0] : "N/A"}</span> </p>
                                  <p className='fw-bold col-10 text-left mt-4'>Top Level Domain: <span className='fw-normal'>{nation.cca2 ? nation.cca2 : "N/A"}</span></p>
                                  <p className='fw-bold col-10 text-left'>Currencies:       <span className='fw-normal'>{nation.currencies ? Object.values(nation.currencies).map(c => c.name).join(', ') : "N/A"}</span></p>
                                  <p className='fw-bold col-10 text-left'>Languages:        <span className='fw-normal'>{nation.languages ? Object.values(nation.languages).join(', ') : "N/A"}</span> </p>
                              </>
                            }
                          </div>
 

                        ))
                      :
                      
                      CurrentItems.map((data) => (
                        <div
                            key={data.id}
                            onClick={() => ViewDetails(data.id)}
                            className={`nation rounded rounded-3 shadow overflow-hidden mb-3 d-flex flex-column${data.isActive ? ' active' : ''}`}
                          >
                            <img src={data.flags.png} alt="National Flag" />
                            <h1 className='ps-3 fw-bold'>{data.name.common}</h1>
                            <p className='ps-3 fw-medium'>Population: <span className='fw-normal'>{data.population}</span></p>
                            <p className='ps-3 fw-medium'>Region:     <span className='fw-normal'>{data.region}</span></p>
                            <p className='ps-3 fw-medium'>Capital:    <span className='fw-normal'>{data.capital ? data.capital[0] : 'N/A'}</span></p>
                          </div>
                        ))
                      }
                </div>
                    {
                      details ? 
                      null 
                      :
                        <div className="pagination d-flex flex-wrap justify-content-center align-items-center pt-4 pb-4"
                        style={{ backgroundColor: isDark ? 'hsl(207, 26%, 17%)' : '#fff', color: isDark ? '#fff' : '#000' }}>
                        
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
                    }
                          
    </section>
    </>

)
}

export default Section
