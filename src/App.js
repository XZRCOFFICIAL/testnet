
import { useState } from "react";
import { ethers } from "ethers";

function App() {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Disconnected");

  async function connectWallet() {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();
      setStatus(`Connected: ${userAddress}`);
    } else {
      setStatus("Please install MetaMask");
    }
  }

  async function sendTransaction() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    try {
      const tx = await signer.sendTransaction({
        to: address,
        value: ethers.utils.parseEther(amount),
      });
      await tx.wait();
      alert("Transaction sent!");
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  return (
    <div style={{ padding: "2rem", color: "white", textAlign: "center", backgroundColor: "#001f2f", minHeight: "100vh" }}>
      <h1>ZK-Rollup Demo – XZRC</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
      <p>{status}</p>
      <input
        type="text"
        placeholder="Recipient Address"
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Amount (ETH)"
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={sendTransaction}>Send</button>
    </div>
  );
}

export default App;
