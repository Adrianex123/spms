import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl } from "@/components/ui/form";

export default function SelectDemo({ data, brandsData }: any) {
  function findBrandById(idString: any) {
    const id = parseInt(idString);

    const foundItem = brandsData.find((item: any) => item.id === id);

    if (foundItem) {
      return foundItem.brand_name;
    } else {
      return "Brands not found";
    }
  }

  return (
    <Select onValueChange={data.onChange} value={data.value}>
      <FormControl>
        <SelectTrigger
          id="brand"
          name="brand"
          value={data.value}
          className="w-full bg-lightComponentBg border-slate-600/50 rounded-lg "
        >
          <SelectValue
            className="text-white"
            placeholder={data ? findBrandById(data.value) : "Select a brand"}
          />
        </SelectTrigger>
      </FormControl>
      <SelectContent className="rounded-lg bg-lightComponentBg border-slate-600/50 text-white">
        <SelectGroup>
          {brandsData.map((brand: any) => (
            <SelectItem key={brand.id} value={brand.id.toString()}>
              {brand.brand_name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
