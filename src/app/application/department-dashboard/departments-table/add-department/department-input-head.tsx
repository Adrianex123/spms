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
        id="department"
        name="department"
        className="w-full border-slate-600/50 rounded-lg"
        {...data}
      >
        <SelectValue
          className=""
          placeholder="MFO/PAP (Major Final Outputs) Types"
        />
      </SelectTrigger>
      <SelectContent className="rounded-lg border-slate-600/50">
        <SelectGroup>
          <SelectItem
            value="General Administration and Support Services (GASS)
"
          >
            General Administration and Support Services (GASS)
          </SelectItem>
          <SelectItem value="Support to Operation (STO)/Auxiliary Services">
            Support to Operation (STO)/Auxiliary Services
          </SelectItem>
          <SelectItem value="Higher Education Program">
            Higher Education Program
          </SelectItem>
          <SelectItem value="Advanced Education Program">
            Advanced Education Program
          </SelectItem>
          <SelectItem value="Research Program">Research Program</SelectItem>
          <SelectItem value=" Technical Advisory Extension Program">
            Technical Advisory Extension Program
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
``;
