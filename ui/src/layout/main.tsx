import {
  useAppKitAccount,
  useAppKitProvider,
  type Provider,
} from "@reown/appkit/react";
import MainHeader from "./main-header";
import { ethers } from "ethers";

export default function Main() {
  const { walletProvider } = useAppKitProvider<Provider>("eip155");
  const { address } = useAppKitAccount();

  const handleGetBalance = async () => {
    const provider = new ethers.providers.Web3Provider(walletProvider);
    if (!address) return;
    const balance = await provider.getBalance(
      "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c"
    );
    console.log(balance);
  };

  return (
    <main className="w-full border">
      <MainHeader />
      <div className="h-[calc(100lvh-56px)] p-4">
        <button onClick={handleGetBalance}>get balance</button>
      </div>
    </main>
  );
}
