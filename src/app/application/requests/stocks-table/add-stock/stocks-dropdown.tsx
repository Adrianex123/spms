import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl } from "@/components/ui/form";
import { useSelector } from "react-redux";

export default function SelectDemo({ data }: { data: any }) {
  const stocksData = useSelector((state: any) => state.stocks);

  return (
    <Select onValueChange={data.onChange} value={data.value}>
      <FormControl>
        <SelectTrigger
          id="main_stocks_id"
          name="main_stocks_id"
          value={data.value}
          className="w-full  border-slate-600/50 rounded-lg "
        >
          <SelectValue className="text-black" placeholder="Select a Stock" />
        </SelectTrigger>
      </FormControl>
      <SelectContent className="rounded-lg border-slate-600/50 text-black">
        <SelectGroup>
          {stocksData.map((stocks: any) => (
            <SelectItem key={stocks.id} value={stocks.id.toString()}>
              {stocks.value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
