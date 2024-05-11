import * as React from "react";

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
  const rolesData = useSelector((state: any) => state.roles);

  return (
    <Select onValueChange={data.onChange}>
      <FormControl>
        <SelectTrigger className="w-full border-slate-600/50 rounded-lg ">
          <SelectValue className="" placeholder="Select a role" />
        </SelectTrigger>
      </FormControl>
      <SelectContent className="rounded-lg border-slate-600/50 ">
        <SelectGroup>
          {rolesData.map((role: any) => (
            <SelectItem key={role.id} value={role.id.toString()}>
              {role.value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
