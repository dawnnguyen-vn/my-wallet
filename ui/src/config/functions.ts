import { ethers } from "ethers";

// BSC mainnet RPC
const provider = new ethers.providers.JsonRpcProvider(
  "https://bsc-dataseed.bnbchain.org"
);

const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

// btc to usd api: https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd

export async function getTokenBalance(
  tokenAddress: string,
  walletAddress: string
) {
  const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
  const [rawBalance, decimals] = await Promise.all([
    contract.balanceOf(walletAddress),
    contract.decimals(),
  ]);
  return Number(ethers.utils.formatUnits(rawBalance, decimals));
}

export async function getBTCPrice() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
  );
  const data = await res.json();
  return data.bitcoin.usd as number;
}
