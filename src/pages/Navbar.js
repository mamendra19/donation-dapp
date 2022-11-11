import { NavLink } from "react-router-dom";
import './Nav.css'
// import logoUrl from '../logonft.jpg'

import { useEffect, useState } from "react";


const Navigation = () => {
    const [account, setAccount] = useState('Connect Wallet')

    useEffect(() => {
        web3Handler()
    })

    const web3Handler = async () => {

        await window.web3.currentProvider.request({ method: 'eth_requestAccounts' }).then(accounts => {
            setAccount(accounts[0]);
        }).catch(() => {
            setAccount('Connect Wallet')
        })

    }



    return (

        <div className="nav">
            <input type="checkbox" id="nav-check" />
            <div className="nav-header">
                <div className="nav-title">
                    {/* <img width="50px" src={logoUrl}></img> */}

                </div>
            </div>
            <div className="nav-btn">
                <label htmlFor="nav-check">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
            </div>

         
            <div className="nav-links">
               
                 <NavLink to="/create_campaign" >
                   Create Campaign
                </NavLink>

                <NavLink to="/donate_funds" >
                    Withdraw Funds
                </NavLink>

                <NavLink to="/withdraw_funds" >
                    Donate Funds
                </NavLink>

               

                <button onClick={web3Handler} className="walletbtn">
                    {account.slice(0, 5) + '...' + account.slice(38, 42)}
                </button>

            </div>
              
        </div>



    )

}

export default Navigation;