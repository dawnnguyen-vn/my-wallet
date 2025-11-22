import MainHeader from "@/layout/main-header";
import Dashboard from "@/components/dashboard/dashboard";
import SideBar from "@/layout/side-bar";

export default function Main() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <SideBar className="hidden md:block w-64 shrink-0" />
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <MainHeader />
        <main className="flex-1 overflow-auto">
          <Dashboard />
        </main>
      </div>
    </div>
  );
}
