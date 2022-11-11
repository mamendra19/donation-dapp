import "../App.css";
import React from "react";
import { loadBlockchain } from "../components/BlockchainLoad";
import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useLocation } from "react-router-dom";


const Withdraw_funds = () => {

  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      const { accounts, donation } = await loadBlockchain();
     // implement here
    }
    try {
      fetchData();
    } catch (e) {
      alert(" error occured", e);
    }
    setIsLoading(false);
  }, []);

  const handlechange=(e)=>{
    e.preventDefault();
    setmoney(e.target.value);

 }
  const handlesubmit=async(e)=>{
    e.preventDefault();
    const { accounts, donation } = await loadBlockchain()
   // await donation.methods.withdraweth(money*1000000000000000000,ddata.id).send({ from: accounts[0] })
    alert("Widhdrawl Succefull!!!, Enjoy")
 }
const[money,setmoney]=useState(0)
const [amount,setamount]=useState('')
  const [isLoading, setIsLoading] = useState(false);
  // const [ddata, setddata] = useState({
  //   id: "",
  //   name: "",
  //   address: "",
  //   discription: "",
  //   walletac: "",
  //   time: "",
  // });
  return (
    <>
     {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
         
          <div >
            <p>Total Fund Raised :{amount/1000000000000000000}</p>
            <form onSubmit={handlesubmit}>
              <div>
                <input
                
                  placeholder="Enter Money"
                  type="number"
                  value={money}
                  onChange={handlechange}
                ></input>
              </div>
              <button>Withdraw Money</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default Withdraw_funds;