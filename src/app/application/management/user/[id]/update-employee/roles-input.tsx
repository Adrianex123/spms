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

export default function SelectDemo({ data, rolesData }: any) {
  function findRoleById(idString: any) {
    const id = parseInt(idString);

    const foundItem = rolesData.find((item: any) => item.id === id);

    if (foundItem) {
      return foundItem.role;
    } else {
      return "Role not found";
    }
  }

  return (
    <Select onValueChange={data.onChange}>
      <FormControl>
        <SelectTrigger
          id="role"
          name="role"
          className="w-full border-slate-600/50 rounded-lg "
          {...data}
          value={data.value}
        >
          <SelectValue
            className="text-black"
            placeholder={data ? findRoleById(data.value) : "Select a role"}
          />
        </SelectTrigger>
      </FormControl>
      <SelectContent className="rounded-lg border-slate-600/50 text-black">
        <SelectGroup>
          {rolesData.map((role: any) => (
            <SelectItem key={role.id} value={role.id.toString()}>
              {role.role}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
