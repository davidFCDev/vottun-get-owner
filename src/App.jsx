import { useState } from "react";
import "./App.css";
import { getOwnerOfToken, searchToken } from "./service";

function App() {
  const [tokenData, setTokenData] = useState(null);
  const [ownerData, setOwnerData] = useState(null);
  const [formData, setFormData] = useState({
    contractAddress: "",
    network: "",
    id: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSearchToken = async () => {
    try {
      const { contractAddress, network, id } = formData;
      // Convertir network e id a números
      const numericNetwork = parseInt(network);
      const numericId = parseInt(id);

      const tokenResponse = await searchToken(
        contractAddress,
        numericNetwork,
        numericId
      );
      setErrorMessage("");
      console.log(tokenResponse);
      if (tokenResponse && tokenResponse.uri) {
        const response = await fetch(tokenResponse.uri);
        const tokenData = await response.json();
        setTokenData(tokenData);
        setErrorMessage("");
      } else {
        setTokenData(null);
        setErrorMessage("No se encontró ningún NFT.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("No se ha encontrado ningún NFT.");
      setTokenData(null);
    }
  };

  const handleOwnerButtonClick = async () => {
    try {
      const { contractAddress, network, id } = formData;
      const numericNetwork = parseInt(network);
      const numericId = parseInt(id);

      const ownerResponse = await getOwnerOfToken(
        contractAddress,
        numericNetwork,
        numericId
      );
      
      setOwnerData(ownerResponse);
    } catch (error) {
      console.error(error);
      setOwnerData(null);
    }
  };

  return (
    <>
      <h2 style={{fontSize:"2rem", textAlign:"center"}}>Vottun Dapp | Get Owner</h2>
      <div className="container">
        <form>
          <h2 style={{color:"#10cd9e"}}>Fill the NFT data</h2>
          <label>
            Contract Address:
            <input
              type="text"
              name="contractAddress"
              value={formData.contractAddress}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Network:
            <input
              type="number"
              name="network"
              value={formData.network}
              onChange={handleInputChange}
            />
          </label>
          <label>
            ID:
            <input
              type="number"
              name="id"
              value={formData.id}
              onChange={handleInputChange}
            />
          </label>
          <button className="button" type="button" onClick={handleSearchToken}>
            Search
          </button>
          {errorMessage && <p style={{color:"red", fontSize:"14px"}}>{errorMessage}</p>}
        </form>
        <div className="card-list">
          {tokenData && (
            <div className="card">
              <img src={tokenData.image} alt="Token" />
              <h2>{tokenData.name}</h2>
              <p>{tokenData.description}</p>
              <p>Quantity: {tokenData.data.Quantity}</p>
              <p>Artist: {tokenData.data.artist}</p>
              <button className="button" onClick={handleOwnerButtonClick}>Get Owner</button>
              {ownerData && <p style={{fontSize:"12px"}}>{ownerData.owner}</p>}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
