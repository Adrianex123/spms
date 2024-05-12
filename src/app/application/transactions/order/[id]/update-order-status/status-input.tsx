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
    <Select onValueChange={data.onChange}>
      <SelectTrigger
        id="status"
        name="status"
        className="w-full bg-lightComponentBg border-slate-600/50 rounded-lg "
        {...data}
      >
        <SelectValue
          className="text-black"
          placeholder={data ? data.value : "Select Status"}
        />
      </SelectTrigger>
      <SelectContent className="rounded-lg bg-lightComponentBg border-slate-600/50 text-black">
        <SelectGroup>
          <SelectItem value="Paid">Paid</SelectItem>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="Archive">Archive</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
