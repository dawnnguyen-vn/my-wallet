import { useAppKitAccount } from "@reown/appkit/react";
import { ethers } from "ethers";

// BSC mainnet RPC
const provider = new ethers.providers.JsonRpcProvider(
  "https://bsc-dataseed.bnbchain.org"
);

const TOKEN_ADDRESSES = {
  USDTB: "0x55d398326f99059fF775485246999027B3197955",
  BTCB: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
};

const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

// btc to usd api: https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd

async function getTokenBalance(tokenAddress: string, walletAddress: string) {
  const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
  const [rawBalance, decimals] = await Promise.all([
    contract.balanceOf(walletAddress),
    contract.decimals(),
  ]);
  return Number(ethers.utils.formatUnits(rawBalance, decimals));
}

export default function Test() {
  const accout = useAppKitAccount();
  const handleClick = async () => {
    if (!accout.address) return;

    const bnbRaw = await provider.getBalance(accout.address);
    const bnb = Number(ethers.utils.formatUnits(bnbRaw, 18));
    const usdt = await getTokenBalance(TOKEN_ADDRESSES.USDTB, accout.address);
    const btcb = await getTokenBalance(TOKEN_ADDRESSES.BTCB, accout.address);

    console.log("BNB:", bnb);
    console.log("USDT:", usdt);
    console.log("BTCB:", btcb);
  };
  return (
    <div>
      <button onClick={() => handleClick()}>Click</button>
    </div>
  );
}
