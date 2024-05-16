import path from "path";
import fs from "fs";
import { Wallets } from "fabric-network";

const walletFileSystemRoot = path.resolve("./wallet");

const getWallet = async () => {
  return Wallets.newFileSystemWallet(walletFileSystemRoot);
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