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
  const categoryData = useSelector((state: any) => state.main_stocks);

  return (
    <Select onValueChange={data.onChange} value={data.value}>
      <FormControl>
        <SelectTrigger
          id="stock_category_id"
          name="stock_category_id"
          value={data.value}
          className="w-full  border-slate-600/50 rounded-lg "
        >
          <SelectValue className="text-white" placeholder="Select a unit" />
        </SelectTrigger>
      </FormControl>
      <SelectContent className="rounded-lg border-slate-600/50 text-black">
        <SelectGroup>
          {categoryData.map((main_stock: any) => (
            <SelectItem key={main_stock.id} value={main_stock.id.toString()}>
              {main_stock.value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
