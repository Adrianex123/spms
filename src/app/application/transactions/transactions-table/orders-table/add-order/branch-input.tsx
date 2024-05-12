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
  const branchesData = useSelector((state: any) => state.branches);
  const currentUser = useSelector((state: any) => state.currentSession);

  return (
    <Select
      onValueChange={data.onChange}
      value={data.value}
      // disabled={currentUser?.roles.role === "Administrator" ? false : true}
    >
      <FormControl>
        <SelectTrigger
          id="branch"
          name="branch"
          value={data.value}
          className="w-full bg-lightComponentBg border-slate-600/50 rounded-lg "
        >
          <SelectValue className="text-black" placeholder="Select a branch" />
        </SelectTrigger>
      </FormControl>
      <SelectContent className="rounded-lg bg-lightComponentBg border-slate-600/50 text-black">
        <SelectGroup>
          {branchesData.map((branch: any) => (
            <SelectItem key={branch.id} value={branch.id.toString()}>
              {branch.value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
