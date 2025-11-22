import AssetAllocation from "@/components/dashboard/asset-allocation";
import OverviewCards from "@/components/dashboard/overview-cards";
import ProfitLossChart from "@/components/dashboard/profit-loss-chart";
import TokenList from "@/components/dashboard/token-list";

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
          Dashboard
        </h2>
      </div>
      <div className="space-y-4">
        <OverviewCards />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="md:col-span-1">
            <AssetAllocation />
          </div>
          <div className="md:col-span-3">
            <ProfitLossChart />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-7">
            <TokenList />
          </div>
        </div>
      </div>
    </div>
  );
}
