import { OverviewCards } from "./overview-cards";
import { ProfitLossChart } from "./profit-loss-chart";
import { TokenList } from "./token-list";

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="space-y-4">
        <OverviewCards />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-7">
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
