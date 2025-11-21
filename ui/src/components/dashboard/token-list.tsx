import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const tokens = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    balance: "0.45",
    price: "$65,000.00",
    value: "$29,250.00",
    avgCost: "$55,000.00",
    profit: "+$4,500.00",
    profitPercent: "+18.18%",
    icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    balance: "4.2",
    price: "$3,500.00",
    value: "$14,700.00",
    avgCost: "$2,800.00",
    profit: "+$2,940.00",
    profitPercent: "+25.00%",
    icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  },
  {
    name: "Solana",
    symbol: "SOL",
    balance: "150",
    price: "$145.00",
    value: "$21,750.00",
    avgCost: "$80.00",
    profit: "+$9,750.00",
    profitPercent: "+81.25%",
    icon: "https://cryptologos.cc/logos/solana-sol-logo.png",
  },
];

export function TokenList() {
  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Token</TableHead>
            <TableHead className="text-right hidden md:table-cell">Price</TableHead>
            <TableHead className="text-right hidden md:table-cell">Balance</TableHead>
            <TableHead className="text-right">Value</TableHead>
            <TableHead className="text-right hidden lg:table-cell">Avg Cost (DCA)</TableHead>
            <TableHead className="text-right">Profit/Loss</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tokens.map((token) => (
            <TableRow key={token.symbol}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={token.icon} alt={token.name} />
                    <AvatarFallback>{token.symbol[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span>{token.name}</span>
                    <span className="text-xs text-muted-foreground">{token.symbol}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right hidden md:table-cell">{token.price}</TableCell>
              <TableCell className="text-right hidden md:table-cell">{token.balance} {token.symbol}</TableCell>
              <TableCell className="text-right font-bold">{token.value}</TableCell>
              <TableCell className="text-right text-muted-foreground hidden lg:table-cell">{token.avgCost}</TableCell>
              <TableCell className={`text-right ${token.profitPercent.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                <div className="flex flex-col items-end">
                  <span>{token.profit}</span>
                  <span className="text-xs">{token.profitPercent}</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
