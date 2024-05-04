import { useAccount, useChainId, useSendTransaction } from 'wagmi';

export default function TransactionButton() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { sendTransaction, isLoading, isSuccess, data } = useSendTransaction();

  const handleTransaction = async () => {
    if (!isConnected) {
      alert('Please connect your wallet');
      return;
    }

    if (!chainId) {
      alert('No network connected');
      return;
    }

    // Ensure we're on a specific chain
    if (chainId !== 11155111) {
      alert('Please connect to the Ethereum Sepolia');
      return;
    }

    const recipientAddress = '0x04dC8f32FBC7644Bd643c081195dDF8ed7fDccC4'; // Replace with the actual valid address

    // Validate the Ethereum address format
    if (!/^0x[a-fA-F0-9]{40}$/.test(recipientAddress)) {
      alert('Invalid Ethereum address');
      return;
    }

    sendTransaction({
      request: {
        to: recipientAddress,
        value: '100000000000000000', // 0.1 ETH in Wei
      },
    });
  };

  return (
    <button onClick={handleTransaction} disabled={isLoading}>
      {isSuccess ? `Transaction Hash: ${data?.hash}` : (isLoading ? "Pending, please check your wallet..." : "Send 0.1 ETH")}
    </button>
  );
}
