import { createAppKit } from "@reown/appkit/react";
import ConnectButton from "@/components/connect-button";
import { Ethers5Adapter } from "@reown/appkit-adapter-ethers5";
import { networks } from "@/config";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";

const projectId = import.meta.env.VITE_REOWN_PROJECT_ID;

createAppKit({
  adapters: [new Ethers5Adapter()],
  networks: networks,
  projectId,
  features: {
    swaps: false,
    onramp: false,
    connectMethodsOrder: ["wallet"],
  },
});

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div>
        <h1 className="text-red-500">My wallet</h1>
        <ConnectButton />
        <ModeToggle />
      </div>
    </ThemeProvider>
  );
}

export default App;
