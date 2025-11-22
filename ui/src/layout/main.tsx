import MainHeader from "./main-header";
import Dashboard from "@/components/dashboard/dashboard";
import SideBar from "./side-bar";
import Test from "@/components/test";

export default function Main() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <SideBar className="hidden md:block w-64 shrink-0" />
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <MainHeader />
        <main className="flex-1 overflow-auto">
          {/* <Dashboard /> */}
          <Test />
        </main>
      </div>
    </div>
  );
}
