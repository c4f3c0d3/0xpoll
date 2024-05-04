import { ethers } from 'ethers';
import React, { useState } from 'react';

const TransactionButton: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [transactionStatus, setTransactionStatus] = useState<'idle' | 'pending' | 'done'>('idle');

  const sendTransaction = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();

        const txResponse = await signer.sendTransaction({
          to: '0x04dC8f32FBC7644Bd643c081195dDF8ed7fDccC4', // Make sure to replace it with a valid address
          value: ethers.utils.parseEther('0.01')
        });

        setTransactionStatus('pending');
        console.log('Transaction sent:', txResponse.hash);

        await txResponse.wait();
        setTransactionStatus('done');
        console.log('Transaction confirmed:', txResponse.hash);
      } else {
        console.error('Ethereum object doesn\'t exist!');
      }
    } catch (error) {
      console.error('Transaction failed:', error);
      setTransactionStatus('idle');
    }
  };

  const handleClick = () => {
    setOpen(true);
    sendTransaction();
  };

  return (
    <button onClick={handleClick}>
      {transactionStatus === 'pending' ? "Pending, please check your wallet..." : "Send 0.01 ETH"}
    </button>
  );
};

export default TransactionButton;
