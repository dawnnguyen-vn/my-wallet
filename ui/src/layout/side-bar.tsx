import { LayoutDashboard, PieChart, Wallet, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SideBarProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
}

export default function SideBar({ className, onClose }: SideBarProps) {
  return (
    <div className={cn("pb-12 w-64 border-r min-h-screen bg-background", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            My Wallet
          </h2>
          <div className="space-y-1">
            <Button variant="secondary" className="w-full justify-start" onClick={onClose}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={onClose}>
              <Wallet className="mr-2 h-4 w-4" />
              Assets
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={onClose}>
              <PieChart className="mr-2 h-4 w-4" />
              Analytics
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={onClose}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
      </div>
      <div className="px-3 py-2 mt-auto">
          <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50" onClick={onClose}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
      </div>
    </div>
  );
}
