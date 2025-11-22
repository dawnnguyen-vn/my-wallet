import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const timeRanges = [
  {
    value: "3m",
    label: "Last 3 months",
  },
  {
    value: "30d",
    label: "Last 30 days",
  },
  {
    value: "7d",
    label: "Last 7 days",
  },
];

export default function TimeRangeSelect({
  timeRange,
  handleTimeRangeChange,
}: {
  timeRange: string;
  handleTimeRangeChange: (timeRang: string) => void;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <div className="flex items-center space-x-2">
        {timeRanges.map((item) => (
          <Button
            key={item.value}
            variant={timeRange === item.value ? "default" : "outline"}
            size="sm"
            onClick={() => handleTimeRangeChange(item.value)}
          >
            {item.label}
          </Button>
        ))}
      </div>
    );
  }

  return (
    <Select
      value={timeRange}
      onValueChange={(value) => handleTimeRangeChange(value)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Time range" />
      </SelectTrigger>
      <SelectContent>
        {timeRanges.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
