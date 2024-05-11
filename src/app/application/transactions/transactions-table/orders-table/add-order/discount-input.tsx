import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectDemo({ data }: { data: any }) {
  return (
    <Select onValueChange={data.onChange} value={data.value || ""}>
      <SelectTrigger
        id="discount1"
        name="discount"
        className="w-full bg-lightComponentBg border-slate-600/50 rounded-lg "
        {...data}
      >
        <SelectValue className="text-white" placeholder="Select a discount" />
      </SelectTrigger>
      <SelectContent className="rounded-lg bg-lightComponentBg border-slate-600/50 text-white">
        <SelectGroup>
          <SelectItem value="0">0%</SelectItem>
          <SelectItem value="5">5%</SelectItem>
          <SelectItem value="10">10%</SelectItem>
          <SelectItem value="15">15%</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
