import React, { useEffect, useRef, useState } from 'react'
import '../Nation/Nation.css'

function Nation({setCountry}) {
    
    const [nation,setNation ] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [error, setError ] = useState('')

    // const apikey = "https://restcountries.com/v3.1/name/all"
    const countryApi = "https://restcountries.com/v3.1/all?fields=name,flags,lang,capital,subregion,region,population,currencies,cca2"


    
    const handleapi =async()=>{

        try{
            setIsLoading(true)
            const response = await fetch(`${countryApi}`)
            if(!response.ok){
                const Errordata = await response.json()
                throw new Error(Errordata.message || "Something went wrong! Please try again later.")
            }
            
            const data =await response.json()
            setNation(data)
            setCountry(data)
        }catch(error){
            setError(error.message || "Please try agian later!")
        }
        finally{
            setIsLoading(false)
        }

    }

    useEffect(()=>{
        handleapi()
    },[])

    

  return (
    <></>
)
}
export default Nation
