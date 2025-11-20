import ConnectButton from "@/components/connect-button";
import { ModeToggle } from "@/components/mode-toggle";

export default function MainHeader() {
  return (
    <header className="flex justify-between h-14 items-center px-4 border-b sticky">
      <p>Label</p>
      <div className="flex gap-2">
        <ConnectButton />
        <ModeToggle />
      </div>
    </header>
  );
}
