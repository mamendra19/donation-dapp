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

    <div className="App">


      {/* {isConnected && <Navbar />} */}
      <Navbar />
      

      <Donate_funds />
      <Withdraw_funds />
      <Create_campaign />
    </div>
  );
}

export default App;
