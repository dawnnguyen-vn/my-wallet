import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TimeRangeSelect from "./time-range-select";

const data3Months = [
  { date: "Jun 24", value: 2400 },
  { date: "Jun 25", value: 1398 },
  { date: "Jun 26", value: 5800 },
  { date: "Jun 27", value: 3908 },
  { date: "Jun 28", value: 4800 },
  { date: "Jun 29", value: 3800 },
  { date: "Jun 30", value: 4300 },
  { date: "Jul 01", value: 5300 },
  { date: "Jul 02", value: 6300 },
  { date: "Jul 03", value: 7300 },
  { date: "Jul 04", value: 6800 },
  { date: "Jul 05", value: 7800 },
];

const data30Days = [
  { date: "Week 1", value: 4000 },
  { date: "Week 2", value: 3000 },
  { date: "Week 3", value: 5000 },
  { date: "Week 4", value: 4500 },
];

const data7Days = [
  { date: "Mon", value: 4200 },
  { date: "Tue", value: 4300 },
  { date: "Wed", value: 4500 },
  { date: "Thu", value: 4400 },
  { date: "Fri", value: 4800 },
  { date: "Sat", value: 5000 },
  { date: "Sun", value: 5200 },
];

export function ProfitLossChart() {
  const [timeRange, setTimeRange] = useState("3m");
  const [data, setData] = useState(data3Months);

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
    if (range === "3m") setData(data3Months);
    if (range === "30d") setData(data30Days);
    if (range === "7d") setData(data7Days);
  };

  return (
    <Card className="col-span-4 max-md:py-4 max-md:gap-4">
      <CardHeader className="flex flex-row items-center justify-between pb-8 max-md:px-4 max-md:pb-4">
        <div className="space-y-1">
          <CardTitle className="text-base font-normal">
            Total Profit/Loss
          </CardTitle>
          <CardDescription>
            Total for the last{" "}
            {timeRange === "3m"
              ? "3 months"
              : timeRange === "30d"
              ? "30 days"
              : "7 days"}
          </CardDescription>
        </div>
        <TimeRangeSelect
          timeRange={timeRange}
          handleTimeRangeChange={handleTimeRangeChange}
        />
      </CardHeader>
      <CardContent className="max-md:px-0.5">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--primary)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--primary)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="var(--primary)"
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
