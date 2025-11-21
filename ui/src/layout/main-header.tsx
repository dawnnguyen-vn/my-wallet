import { useState } from "react";
import ConnectButton from "@/components/connect-button";
import { ModeToggle } from "@/components/mode-toggle";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import SideBar from "./side-bar";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function MainHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex justify-between h-14 items-center px-4 border-b sticky top-0 bg-background z-50">
      <div className="flex items-center gap-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <VisuallyHidden>
                <SheetTitle>Navigation Menu</SheetTitle>
            </VisuallyHidden>
            <SideBar onClose={() => setOpen(false)} className="border-none" />
          </SheetContent>
        </Sheet>
        <p className="font-bold text-xl hidden md:block">My Wallet</p>
        <p className="font-bold text-xl md:hidden">Wallet</p>
      </div>
      <div className="flex gap-2">
        <ConnectButton />
        <ModeToggle />
      </div>
    </header>
  );
}
