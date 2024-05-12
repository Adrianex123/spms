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
  const uomsData = useSelector((state: any) => state.uoms);

  return (
    <Select onValueChange={data.onChange} value={data.value}>
      <FormControl>
        <SelectTrigger
          id="uom_id"
          name="uom_id"
          value={data.value}
          className="w-full  border-slate-600/50 rounded-lg "
        >
          <SelectValue className="text-black" placeholder="Select a unit" />
        </SelectTrigger>
      </FormControl>
      <SelectContent className="rounded-lg border-slate-600/50 text-black">
        <SelectGroup>
          {uomsData.map((uom: any) => (
            <SelectItem key={uom.id} value={uom.id.toString()}>
              {uom.value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
