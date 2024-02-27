import React, { useState } from "react";
import HeaderMain from "./Components/HeaderMain/HeaderMain";
import { APP_ENUM } from "./enums/appEnum";
import styles from "./styles/app.module.scss";
const App = () => {
  const [organization, setOrganization] = useState("");
  const [rollupName, setRollupName] = useState("");
  const [chainId, setChainId] = useState("");
  const [customSelectedButton, setCustomSelectedButton] = useState("ETH");
  const [availabilitySelectedButton, setAvailabilitySelectedButton] =
    useState("ETH_DA");
  const [environmentSelectedButton, setEnvironmentSelectedButton] =
    useState("TESTNET");
  const handleOnChangeOrganization = (e) => {
    setOrganization(e.target.value);
  };
  const handleOnChangeRollupNmae = (e) => {
    setRollupName(e.target.value);
  };
  const handleOnChangeChainId = (e) => {
    setChainId(e.target.value);
  };
  const handleOnClickEthereum = () => {
    setCustomSelectedButton("ETH");
  };
  const handleOnClickCPlus = () => {
    setCustomSelectedButton("C++");
  };
  const handleOnClickEthereumDA = () => {
    setAvailabilitySelectedButton("ETH_DA");
  };
  const handleOnClickTestnet = () => {
    setEnvironmentSelectedButton("ETH_DA");
  };
  const handleOnClickDeploy = async () => {
    try {
      const details = {
        organization: organization,
        rollupName: rollupName,
        chainId: chainId,
        environment_type: environmentSelectedButton,
      };
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      };
      const response = await fetch(
        process.env.REACT_APP_SERVER_URI + "/get-deploy-response",
        requestOptions
      );
      if (response.ok) {
        //TODO: continue the process
      }
    } catch (e) {
      console.log("e", e);
    }
  };

  return (
    <div>
      <HeaderMain />
      <div className={styles.deployContentsMainContainer}>
        <div className={styles.deployHeading}>{APP_ENUM.deployContent}</div>
        <div className={styles.inputBoxes}>
          <div className={styles.inputBoxContainer}>
            <input
              type="text"
              value={organization}
              autoFocus
              onChange={handleOnChangeOrganization}
              placeholder={APP_ENUM.organization}
              className={styles.walletAddressInput}
            />
          </div>
          <div className={styles.inputBoxContainer}>
            <input
              type="text"
              value={rollupName}
              onChange={handleOnChangeRollupNmae}
              placeholder={APP_ENUM.rollupName}
              className={styles.walletAddressInput}
            />
          </div>
          <div className={styles.inputBoxContainer}>
            <input
              type="number"
              value={chainId}
              onChange={handleOnChangeChainId}
              placeholder={APP_ENUM.chainId}
              className={styles.walletAddressInput}
            />
          </div>
        </div>
        <div className={styles.secondContainer}>
          <div className={styles.customizeStack}>{APP_ENUM.customizeStack}</div>
          <div className={styles.buttonsContainer}>
            <button
              className={`${styles.button} ${
                customSelectedButton === "ETH"
                  ? styles.selected
                  : styles.notSelected
              }`}
              onClick={handleOnClickEthereum}
            >
              Ethereum
            </button>
            <button
              className={`${styles.button} ${
                customSelectedButton === "C++"
                  ? styles.selected
                  : styles.notSelected
              }`}
              onClick={handleOnClickCPlus}
            >
              C++
            </button>
            <button className={styles.button} disabled>
              NodeJs
            </button>
          </div>
          <div className={styles.dataAvailability}>
            {APP_ENUM.dataAvailability}
          </div>
          <div className={styles.buttonsContainer}>
            <button
              className={`${styles.button} ${
                availabilitySelectedButton === "ETH_DA"
                  ? styles.selected
                  : styles.notSelected
              }`}
              onClick={handleOnClickEthereumDA}
            >
              Ethereum DA
            </button>
            <button className={styles.button} disabled>
              Others
            </button>
          </div>
        </div>
        <div className={styles.thirdContainer}>
          <div className={styles.environment}>{APP_ENUM.environment}</div>
          <div className={styles.buttonsContainer}>
            <button
              className={`${styles.button} ${
                environmentSelectedButton === "TESTNET"
                  ? styles.selected
                  : styles.notSelected
              }`}
              onClick={handleOnClickTestnet}
            >
              Testnet
            </button>
            <button className={styles.button} disabled>
              Mainnet
            </button>
          </div>
        </div>
        <div className={styles.deployButtonContainer}>
          <button className={styles.deployButton} onClick={handleOnClickDeploy}>
            Deploy
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
