import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, DollarSign } from "lucide-react";

export default function OverviewCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="max-md:py-4 max-md:gap-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 max-md:px-4">
          <CardTitle className="text-sm font-medium">
            Total Wallet Value
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="max-md:px-4">
          <div className="text-2xl font-bold">$45,231.89</div>
          <p className="text-xs text-muted-foreground flex items-center pt-1">
            <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">+20.1%</span>
            <span className="ml-1">from last month</span>
          </p>
        </CardContent>
      </Card>
      <Card className="max-md:py-4 max-md:gap-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 max-md:px-4">
          <CardTitle className="text-sm font-medium">
            Total Wallet Value
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="max-md:px-4">
          <div className="text-2xl font-bold">$45,231.89</div>
          <p className="text-xs text-muted-foreground flex items-center pt-1">
            <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">+20.1%</span>
            <span className="ml-1">from last month</span>
          </p>
        </CardContent>
      </Card>
      <Card className="max-md:py-4 max-md:gap-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 max-md:px-4">
          <CardTitle className="text-sm font-medium">
            Total Wallet Value
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="max-md:px-4">
          <div className="text-2xl font-bold">$45,231.89</div>
          <p className="text-xs text-muted-foreground flex items-center pt-1">
            <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">+20.1%</span>
            <span className="ml-1">from last month</span>
          </p>
        </CardContent>
      </Card>
      <Card className="max-md:py-4 max-md:gap-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 max-md:px-4">
          <CardTitle className="text-sm font-medium">
            Total Wallet Value
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="max-md:px-4">
          <div className="text-2xl font-bold">$45,231.89</div>
          <p className="text-xs text-muted-foreground flex items-center pt-1">
            <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">+20.1%</span>
            <span className="ml-1">from last month</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
