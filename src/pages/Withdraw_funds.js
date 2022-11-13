
// import "../App.css";
// import React from "react";
// import { loadBlockchain } from "../components/BlockchainLoad";
// import { useState, useEffect } from "react";
// import LoadingSpinner from "../components/LoadingSpinner";

// const Withdraw_funds = () => {
//   const handlechange = (e) => {
//     e.preventDefault();
//     setid(e.target.value);
//   };

//   const handlesubmit = async (e) => {
//     e.preventDefault();
//     const { accounts, ddapp } = await loadBlockchain();
//     await ddapp.methods.endCampaign(id).send({ from: accounts[0] });
//     await ddapp.methods.withdrawCampaignFunds(id).send({ from: accounts[0] });
//     alert("Widhdrawl Succefull!!!");
//   };

//   const [id, setid] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [balance,setbalance]=useState(0);

//   return (
//     <>
//       {isLoading ? (
//         <LoadingSpinner />
//       ) : (
//         <div  className="foot">
//           <h1>Withdraw Money</h1>
//           <div>
//             <form onSubmit={handlesubmit}>
//               <div>
//                 <input
//                 className="rcinp"
//                   placeholder="Enter Campaign ID"
//                   type="number"
//                   value={id}
//                   onChange={handlechange}
//                 ></input>
//               </div>
//               <button className="btn">Withdraw Money</button>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
// export default Withdraw_funds;

import "../App.css";
import React from "react";
import { loadBlockchain } from "../components/BlockchainLoad";
import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const Withdraw_funds = () => {
  const handlechange = (e) => {
    e.preventDefault();
    setid(e.target.value);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    
    const { accounts, ddapp } = await loadBlockchain();

    const cmp=await ddapp.methods._campaigns(id).call();

    setbalance(cmp.balance)
    console.log(cmp.balance);
    let x=cmp.balance;
    alert('campaign balance is ' + x);
    
  
    await ddapp.methods.withdrawCampaignFunds(id).send({ from: accounts[0] });
    setIsLoading(false)
    alert("Widhdrawal Successful!!!");
    // await ddapp.methods.endCampaign(id).send({ from: accounts[0] });
    
  };

  const [id, setid] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [balance,setbalance]=useState(0);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div  className="foot">
          <h1>Withdraw Money</h1>
          <div>
            <form onSubmit={handlesubmit}>
              <div>
                <input
                className="rcinp"
                  placeholder="Enter Campaign ID"
                  type="number"
                  value={id}
                  onChange={handlechange}
                ></input>
              </div>
              <button className="btn">Withdraw Money</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default Withdraw_funds;