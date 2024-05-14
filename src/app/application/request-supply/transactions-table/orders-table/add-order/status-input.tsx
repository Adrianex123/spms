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
        id="calamityTypes"
        name="Calamity Type"
        className="w-full bg-lightComponentBg border-slate-600/50 rounded-lg "
        {...data}
      >
        <SelectValue
          className="text-white"
          placeholder="Select calamity types"
        />
      </SelectTrigger>
      <SelectContent className="rounded-lg bg-lightComponentBg border-slate-600/50 text-black">
        <SelectGroup>
          <SelectItem value="quake">Earthquake</SelectItem>
          <SelectItem value="Flood">Flood</SelectItem>
          <SelectItem value="Fire">Fire</SelectItem>
          <SelectItem value="Tornado">Tornado</SelectItem>
          <SelectItem value="Hurricane">Hurricane</SelectItem>
          <SelectItem value="Volcano Eruption">Volcano Eruption</SelectItem>
          <SelectItem value="Blizzard">Blizzard</SelectItem>
          <SelectItem value="Drought">Drought</SelectItem>
          <SelectItem value="Wildfire">Wildfire</SelectItem>
          <SelectItem value="Tsunami">Tsunami</SelectItem>
          <SelectItem value="Cyclone">Cyclone</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
