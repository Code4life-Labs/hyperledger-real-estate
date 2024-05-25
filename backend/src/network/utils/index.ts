import path from "path";
import fs from "fs";
import { Wallets } from "fabric-network";

import { NetworkConfig } from "../../assets/config/network";

const getWallet = async () => {
  return Wallets.newFileSystemWallet(NetworkConfig.Paths.Wallet);
}

const getConnectionProfile = (testNetworkRoot: string, orgName: string, orgNameWithoutDomain: string) => {
  return JSON.parse(fs.readFileSync(
    path.join(
      testNetworkRoot,
      'organizations/peerOrganizations',
      orgName,
      `/connection-${orgNameWithoutDomain}.json`),
      'utf8'
  ));
}

export const NetworkUtils = {
  getWallet,
  getConnectionProfile
}