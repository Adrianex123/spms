import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SmallVehicle from "@/images/vehicle-small.png";
import MediumVehicle from "@/images/vehicle-medium.png";
import LargeVehicle from "@/images/vehicle-large.png";
import Image from "next/image";

export default function SelectDemo({ data }: { data: any }) {
  const vehicleTypes = [
    {
      id: "small",
      value: "small",
      label: "Small",
      image: SmallVehicle,
    },
    {
      id: "medium",
      value: "medium",
      label: "Medium",
      image: MediumVehicle,
    },
    {
      id: "large",
      value: "large",
      label: "Large",
      image: LargeVehicle,
    },
  ];

  return (
    <Select onValueChange={data.onChange} value={data.value || ""}>
      <SelectTrigger
        id="payment"
        name="payment"
        className="w-full bg-lightComponentBg border-slate-600/50 rounded-lg "
        {...data}
      >
        <SelectValue
          className="text-white"
          placeholder="Select a type of vehicle"
        />
      </SelectTrigger>
      <SelectContent className="rounded-lg bg-lightComponentBg border-slate-600/50 text-white">
        <SelectGroup>
          {vehicleTypes.map((vehicleType) => (
            <SelectItem
              key={vehicleType.id}
              value={vehicleType.value}
              className="w-full gap-2"
            >
              <div className="w-full flex justify-between place-items-center gap-6">
                <Image
                  src={vehicleType.image}
                  alt={vehicleType.label}
                  className="w-28 h-12"
                />
                <div className="w-full text-center">{vehicleType.label}</div>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
