import { Button } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function SelectDemo({ data }: any) {
  const allMobileUsers = useSelector(
    (state: any) => state.allMobileUser.allMobileUser
  ).map((mobileUser: any) => ({
    value: mobileUser.id,
    label: mobileUser.first_name + " " + mobileUser.last_name,
  }));

  const [searchValue, setSearchValue] = useState("");

  const filteredMobileUsers = allMobileUsers.filter((mobileUser: any) =>
    mobileUser.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Select onValueChange={data.onChange} value={data.value || ""}>
      <SelectTrigger
        id="mobile_user_id"
        name="mobile_user_id"
        className="w-full bg-lightComponentBg border-slate-600/50 rounded-lg "
        {...data}
      >
        <SelectValue
          className="text-black"
          placeholder="Select a Mobile User"
        />
      </SelectTrigger>
      <SelectContent className="w-[300px] rounded-lg bg-lightComponentBg border-slate-600/50 text-black">
        <SelectGroup className="flex flex-col gap-2 relative max-h-[200px] overflow-y-scroll no-scrollbar">
          <div className="w-full flex place-items-center justify-between stick top-0">
            <SearchIcon className="text-black mx-3" />
            <Input
              className="w-full bg-lightComponentBg border-transparent rounded-lg text-black focus-visible:ring-0 focus:border-0"
              type="text"
              placeholder="Search Mobile Users"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button
              className="w-36 bg-transparent hover:bg-transparent rounded-lg text-xs"
              onClick={() => data.onChange("")}
            >
              Clear
            </Button>
          </div>
          {filteredMobileUsers.map((mobileUser: any) => (
            <SelectItem key={mobileUser.value} value={mobileUser.value}>
              {mobileUser.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
