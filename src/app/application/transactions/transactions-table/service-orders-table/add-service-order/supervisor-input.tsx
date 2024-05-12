import { FormControl } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";

export default function SelectDemo({ data }: { data: any }) {
  const currentUser = useSelector((state: any) => state.currentSession);
  const allSupervisors = useSelector(
    (state: any) => state.allEmployees.allSupervisors
  )
    .map((supervisor: any) => ({
      value: supervisor.id,
      label: supervisor.first_name + " " + supervisor.last_name,
      branch: supervisor.branches.id,
    }))
    .filter((supervisor: any) => supervisor.value !== currentUser.id)
    .filter((supervisor: any) => {
      if (currentUser.roles.role === "Administrator") {
        return true;
      } else {
        return supervisor.branch === currentUser.branches.id;
      }
    });

  return (
    <Select onValueChange={data.onChange} value={data.value || ""}>
      <SelectTrigger
        id="supervisor_id"
        name="supervisor_id"
        className="w-full bg-lightComponentBg border-slate-600/50 rounded-lg "
        {...data}
      >
        <SelectValue className="text-black" placeholder="Select a Supervisor" />
      </SelectTrigger>
      <SelectContent className="rounded-lg bg-lightComponentBg border-slate-600/50 text-black">
        <SelectGroup>
          {allSupervisors.map((supervisor: any) => (
            <SelectItem key={supervisor.value} value={supervisor.value}>
              {supervisor.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
