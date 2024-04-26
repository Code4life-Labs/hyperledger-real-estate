import path from "path";
import { Wallets } from "fabric-network";

const walletFileSystemRoot = path.resolve("./wallet");

const getWallet = async () => {
  return Wallets.newFileSystemWallet(walletFileSystemRoot);
}

export const WalletUtils = {
  getWallet
}