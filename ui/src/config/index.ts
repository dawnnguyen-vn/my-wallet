import {
  bsc,
  mainnet,
  solana,
  type AppKitNetwork,
} from "@reown/appkit/networks";

export const networks = [bsc, mainnet, solana] as [
  AppKitNetwork,
  ...AppKitNetwork[]
];
