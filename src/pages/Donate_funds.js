// import '../App.css'
// import React from 'react';
// import { loadBlockchain } from '../components/BlockchainLoad';
// import { useState, useEffect } from 'react';
// import LoadingSpinner from '../components/LoadingSpinner';
// import { useLocation } from 'react-router-dom';


// const Donate_funds = () => {
//     const location = useLocation();
//     useEffect(() => {
//       setIsLoading(true)
//       async function fetchData() {
//           const { accounts, donation } = await loadBlockchain()
//          //implement here 
          
//       }
//       try {
//           fetchData()
//       }
//       catch (e) {
//           alert(' error occured', e)
//       }
//       setIsLoading(false)
//   }, [])

//     const donateth=async()=>{
//         setIsLoading(true)
//         // implement here
//         setIsLoading(false)
//         alert('Donated Succesfully. thanks')
//        }
//        const [isLoading, setIsLoading] = useState(false);
//     return (
//         <>
//            {isLoading ? <LoadingSpinner /> :
//                 <div >
                   
//                     <p>Donate ethers</p>
//                     <input
                
//                 placeholder="Enter ethers to donate"
//                 type="number"
//                 value={money}
//                 onChange={handlechange}
//               ></input>
//                     <button  onClick={donateth}>Donate</button>
//                 </div>
//             }
//         </>
//     )
// }
// export default Donate_funds
import '../App.css'
import React from 'react';
import { loadBlockchain } from '../components/BlockchainLoad';
import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';



const Donate_funds = () => {
   

    const handleSubmit=async()=>{
        setIsLoading(true)
        const{accounts,ddapp}=await loadBlockchain();
        const cmp=await ddapp.methods._campaigns(id).call();
        await ddapp.methods.donateToCampaign(id).send({from:accounts[0],value:money})
    
    console.log(cmp.balance);
     setIsLoading(false)
        alert('Donated Succesfully. thanks')

       }

    const handlechange1=(e)=>{
        e.preventDefault();
        setid(e.target.value);
        
    }

    const handlechange2=(e)=>{
        e.preventDefault();
        setmoney(e.target.value);
        
    }
     const [isLoading, setIsLoading] = useState(false);
     const[money,setmoney]=useState('')
     const[id,setid]=useState('')

    return (
        <>
           {isLoading ? <LoadingSpinner /> :
                <div  className="foot">
                    <h1>Donate to a Campaign</h1>
                <input
                 className="rcinp"
                  placeholder="Enter Campaign ID"
                  type="number"
                  value={id}
                  onChange={handlechange1}
                ></input>
                <br>
                </br>
                <input
                 className="rcinp"
                  placeholder="Enter Amount in Wei"
                  type="number"
                  value={money}
                  onChange={handlechange2}
                ></input>
                    <button className="btn"  onClick={handleSubmit}>Donate</button>
                </div>
            }
        </>
    )
}
export default Donate_funds