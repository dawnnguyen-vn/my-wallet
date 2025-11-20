import { createAppKit } from "@reown/appkit/react";
import { Ethers5Adapter } from "@reown/appkit-adapter-ethers5";
import { networks } from "@/config";
import { ThemeProvider } from "@/components/theme-provider";
import SideBar from "./layout/side-bar";
import Main from "./layout/main";

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
      <div className="flex">
        <SideBar />
        <Main />
      </div>
    </ThemeProvider>
  );
}

export default App;
