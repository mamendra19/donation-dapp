import logo from './logo.svg';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './pages/Navbar';
import React, { useState, useEffect } from 'react'
import Donate_funds from './pages/Donate_funds'
import Withdraw_funds from './pages/Withdraw_funds'
import Create_campaign from './pages/Create_campaign'
import Web3 from 'web3';
function App() {

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      const web3 = new Web3(window.ethereum);
      const userAccount = await web3.eth.getAccounts();
      const account = userAccount[0];
      if (account) setIsConnected(true)
    }
    fetchdata()
  }, [isConnected])

  return (
    <BrowserRouter>
   


      {/* {isConnected && <Navbar />} */}
      <Navbar />
      <Routes>
        <Route path="/create_campaign" element={<Create_campaign/>} />
        <Route path="/donate_funds" element={<Donate_funds/>} />
        <Route path="/withdraw_funds" element={<Withdraw_funds/>} />
        </Routes>
        </BrowserRouter>
     
    
  );
}

export default App;
