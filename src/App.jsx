import React,{useState} from 'react'
import Section from './section/Section'
import Nation from './Nation/Nation'
import '../src/App.css'

function App() {
  const [country, setCountry] =useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  return (
    <>
      <Section country={country} isLoading={isLoading} error={error}></Section>      
      <Nation setCountry={setCountry} setError={setError} setIsLoading={setIsLoading} ></Nation>
    </>
  )
}
export default App
