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
  const brandsData = useSelector((state: any) => state.brands);

  return (
    <Select onValueChange={data.onChange} value={data.value}>
      <FormControl>
        <SelectTrigger
          id="brand"
          name="brand"
          value={data.value}
          className="w-full bg-lightComponentBg border-slate-600/50 rounded-lg "
        >
          <SelectValue className="text-white" placeholder="Select a Brand" />
        </SelectTrigger>
      </FormControl>
      <SelectContent className="rounded-lg bg-lightComponentBg border-slate-600/50 text-white">
        <SelectGroup>
          {brandsData.map((brand: any) => (
            <SelectItem key={brand.id} value={brand.id.toString()}>
              {brand.value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
