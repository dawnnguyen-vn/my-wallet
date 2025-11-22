import { getBTCPrice, getTokenBalance } from "@/config/functions";
import { useAppKitAccount } from "@reown/appkit/react";
import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, type PieLabelRenderProps } from "recharts";

const TOKEN_ADDRESSES = {
  USDTB: "0x55d398326f99059fF775485246999027B3197955",
  BTCB: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
};

const initData = [
  {
    name: "USDT",
    value: 0,
    amount: 0,
  },
  {
    name: "BTC",
    value: 0,
    amount: 0,
  },
];

const RADIAN = Math.PI / 180;
const COLORS = ["#00C49F", "#F7941D"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <>
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > ncx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${((percent ?? 1) * 100).toFixed(0)}% ${name}`}
      </text>
    </>
  );
};

export default function AssetAllocation() {
  const accout = useAppKitAccount();
  const [data, setData] = useState(initData);
  useEffect(() => {
    const fetchData = async () => {
      if (!accout.address) return;
      const usdt = await getTokenBalance(TOKEN_ADDRESSES.USDTB, accout.address);
      const btc = await getTokenBalance(TOKEN_ADDRESSES.BTCB, accout.address);
      const currentBTCPrice = await getBTCPrice();
      setData([
        {
          name: "USDT",
          value: usdt,
          amount: usdt,
        },
        {
          name: "BTC",
          value: btc * currentBTCPrice,
          amount: btc,
        },
      ]);
    };
    fetchData();
  }, [accout.address]);
  return (
    <PieChart
      style={{
        width: "100%",
        aspectRatio: 1,
      }}
      responsive
    >
      <Pie
        data={data}
        labelLine={false}
        label={renderCustomizedLabel}
        fill="#8884d8"
        dataKey="value"
        isAnimationActive={true}
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${entry.name}`}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
        {/* <LabelList dataKey="name" position="outside" /> */}
      </Pie>
    </PieChart>
  );
}
