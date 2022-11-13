
import Web3 from 'web3'
import { contract } from './contract'
export const loadBlockchain = async () => {
   if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum)
      const accounts = await web3.eth.getAccounts()
      const address = '0x03FB086B9544D40c456306145AEF2Dd323AcF2f7';
      const ddapp = new web3.eth.Contract(contract, address);
      return { accounts, ddapp}
   }
   else {
      alert('plz install metamask')
   }
};


//0x2d5444ea012e79d979e514940a73bc86e21b05b2