// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import React, { useState, useEffect } from 'react'
// import { loadBlockchain } from '../components/BlockchainLoad';
// import LoadingSpinner from '../components/LoadingSpinner';
// import '../App.css'

// const Create_campaign = () => {

//     const handlechange = (e) => {
//         e.preventDefault();
//         const title = e.target.title;
       
//     setcreatecampaign({ ...create_campaign, [title]: e.target.value });
//     }

//     const callblockchain = async (campaign) => {
       
//         //implement here
      
//         toast.success('Donation Request Added', {
//             position: "top-right",
//             autoClose: 2000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//         });

//     }  
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsLoading(true)
//         const campaign = JSON.stringify(create_campaign)
//         await callblockchain(campaign)
//         alert('Campaign created,Thanks')
//         console.log(campaign)
//         setcreatecampaign({ title: '', duration: '', description: '' })
//         setIsLoading(false)

//     }

//     const [create_campaign, setcreatecampaign] = useState({ title: '', duration: '', description: '' })
// const[isLive,setisLive]=useState(false);
// const [isLoading, setIsLoading] = useState(false)
//     return (
//         <>
//             <ToastContainer />
//             {isLoading ? <LoadingSpinner /> :
//                 <div >
//                     <h2>Create Campaign</h2>


//                     <form onSubmit={handleSubmit}>
//                     <div>
//                             <input  placeholder='Enter campaign title' type='text' value={'create_campaign.title'} onChange={handlechange} title='title'></input>
//                         </div>
//                         <div>
//                             <input  placeholder='Enter campaign description' type='text' value={'create_campaign.desription'} onChange={handlechange} description='description'></input>
//                         </div>
//                         <div>
//                             <input  placeholder='Enter campaign duration' type='text' value={'create_campaign.duration'} onChange={handlechange} duration='duration'></input>
//                         </div>
//                         <button>Start campaign</button>
//                     </form>
//                 </div>}
//         </>
//     )
// }

// export default Create_campaign;

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react'
import { loadBlockchain } from '../components/BlockchainLoad';
import LoadingSpinner from '../components/LoadingSpinner';
import '../App.css'

const Create_campaign = () => {

    const handlechange = (e) => {
        e.preventDefault();
        const name = e.target.name;
      setcreatecampaign({ ...create_campaign, [name]: e.target.value });
    }

    const callblockchain = async () => {
       console.log(create_campaign)
       const{accounts,ddapp}=await loadBlockchain();

      let id= await ddapp.methods.startCampaign(create_campaign.title,create_campaign.description,create_campaign.duration).send({from:accounts[0]});
     
       console.log(id);
       toast.success('Campaign successfully created', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    }  
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
       
        await callblockchain()
        alert('Campaign created,Thanks')
        console.log(create_campaign)
        setcreatecampaign({ title: '', duration: '', description: '' })
        setIsLoading(false)

    }

const [create_campaign, setcreatecampaign] = useState({ title: '', duration: '', description: '' })
const [isLoading, setIsLoading] = useState(false)

    return (
        <>
            <ToastContainer />
            {isLoading ? <LoadingSpinner /> :
                <div  className="foot">
                    <h2>Create Campaign</h2>


                    <form onSubmit={handleSubmit}>
                    <div>
                            <input   className="rcinp" placeholder='Enter campaign title' type='text' value={create_campaign.title} onChange={handlechange} name='title'></input>
                        </div>
                        <div>
                            <input   className="rcinp" placeholder='Enter campaign description' type='text' value={create_campaign.description} onChange={handlechange} name='description'></input>
                            </div>
                            <div>
                             <input   className="rcinp" placeholder='Enter campaign duration' type='number' value={create_campaign.duration} onChange={handlechange} name='duration'></input>
                         </div>
                         <button className="btn">Start campaign</button>
                     </form>
         </div>}
 </>
    )
}

export default Create_campaign;