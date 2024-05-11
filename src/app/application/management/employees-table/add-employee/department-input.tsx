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

export default function SelectDemo({ data, form }: { data: any; form: any }) {
  const departmentsData = useSelector((state: any) => state.departments);

  return (
    <Select
      onValueChange={
        form.watch("role") === "1" || form.watch("role") === "2"
          ? ""
          : data.onChange
      }
      value={
        form.watch("role") === "1" || form.watch("role") === "2"
          ? ""
          : data.value
      }
      disabled={
        form.watch("role") === "3" || form.watch("role") === "3" ? true : false
      }
    >
      <FormControl>
        <SelectTrigger
          id="department"
          name="department"
          value={data.value}
          className="w-full border-slate-600/50 rounded-lg "
        >
          <SelectValue className="" placeholder="Select a Department" />
        </SelectTrigger>
      </FormControl>
      <SelectContent className="rounded-lg border-slate-600/50 ">
        <SelectGroup>
          {departmentsData.map((department: any) => (
            <SelectItem key={department.id} value={department.id.toString()}>
              {department.value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
