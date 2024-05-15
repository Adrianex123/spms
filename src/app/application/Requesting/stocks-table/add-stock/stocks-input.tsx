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
  const mainstocksData = useSelector((state: any) => state.main_stocks);

  return (
    <Select onValueChange={data.onChange} value={data.value}>
      <FormControl>
        <SelectTrigger
          id="mainstock_id"
          name="mainstock_id"
          value={data.value}
          className="w-full  border-slate-600/50 rounded-lg "
        >
          <SelectValue className="text-black" placeholder="Select a unit" />
        </SelectTrigger>
      </FormControl>
      <SelectContent className="rounded-lg border-slate-600/50 text-black">
        <SelectGroup>
          {mainstocksData.map((mainstock: any) => (
            <SelectItem key={mainstock.id} value={mainstock.id.toString()}>
              {mainstock.value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
