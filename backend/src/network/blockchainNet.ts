// Import environments
import { env } from "../assets/config/environment";

import fs from "fs";
import path from "path";
import { Wallets, Gateway } from "fabric-network";

// Import utils
import { WalletUtils } from "./utils/wallet";

const gateway = new Gateway();

const testNetworkRoot = env.NETWORK_FILESYSTEM_ROOT as string;
const Chaincodes = {
  Simple: "simple_chaincode",
  BalanceTransfer: "balance_transfer"
}
const timeout = 10000; // 10s

async function invoke(identityLabel: string, functionName: string, ...functionArgs: Array<any>) {
  const wallet = await WalletUtils.getWallet();

  try {
    const orgName = identityLabel.split('@')[1];
    const orgNameWithoutDomain = orgName.split('.')[0];

    let connectionProfile = JSON.parse(fs.readFileSync(
      path.join(testNetworkRoot, 
        'organizations/peerOrganizations', 
        orgName, 
        `/connection-${orgNameWithoutDomain}.json`), 'utf8'
      )
    );

    let connectionOptions = {
      identity: identityLabel,
      wallet: wallet,
      discovery: { enabled: true, asLocalhost: true }
    };

    console.log('Connect to a Hyperledger Fabric gateway.');
    await gateway.connect(connectionProfile, connectionOptions);

    console.log('Use channel "mychannel".');
    const network = await gateway.getNetwork('mychannel');
    // Add block listner
    // addBlockListener(network);

    console.log('Use BalanceTransfer.');
    const contract = network.getContract(Chaincodes.BalanceTransfer);
    // Add contact listener
    // addContractListener(contract);

    // console.log('Submit ' + functionName + ' transaction.');
    // const response = await contract.submitTransaction(functionName, ...chaincodeArgs);
    console.log('Add commit listener.');
    let tx = contract.createTransaction(functionName);
    console.log('Submit ' + functionName + ' transaction.');
    const response = await tx.submit(...functionArgs);

    if(`${response}` !== '') {
      console.log(`Response from ${functionName}: ${response}`);
    }

    return JSON.parse(response.toString());
  } catch (error: any) {
    console.log(`Error processing transaction. ${error}`);
    console.log(error.stack);
    gateway.disconnect();
    throw new Error(error.message);
  } finally {
    console.log('Disconnect from the gateway.');
    gateway.disconnect();
  }
}

export const BlockChainNetwork = {
  invoke
}