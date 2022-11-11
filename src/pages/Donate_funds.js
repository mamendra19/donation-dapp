import '../App.css'
import React from 'react';
import { loadBlockchain } from '../components/BlockchainLoad';
import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { useLocation } from 'react-router-dom';


const Donate_funds = () => {
    const location = useLocation();
    useEffect(() => {
      setIsLoading(true)
      async function fetchData() {
          const { accounts, donation } = await loadBlockchain()
         //implement here 
          
      }
      try {
          fetchData()
      }
      catch (e) {
          alert(' error occured', e)
      }
      setIsLoading(false)
  }, [])

    const donateth=async()=>{
        setIsLoading(true)
        // implement here
        setIsLoading(false)
        alert('Donated Succesfully. thanks')
       }
       const [isLoading, setIsLoading] = useState(false);
    return (
        <>
           {isLoading ? <LoadingSpinner /> :
                <div >
                   
                    <p>Donate ethers</p>
                    <button  onClick={donateth}>Donate</button>
                </div>
            }
        </>
    )
}
export default Donate_funds