import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { Button } from "./ui/button";

export default function ConnectButton() {
  const { open } = useAppKit();
  const { isConnected, address } = useAppKitAccount();

  return (
    <Button
      onClick={() => {
        open();
      }}
    >
      {isConnected && address ? (
        <span>
          {address.slice(0, 4)}...{address.slice(-6)}
        </span>
      ) : (
        "Connect Wallet"
      )}
    </Button>
  );
}
