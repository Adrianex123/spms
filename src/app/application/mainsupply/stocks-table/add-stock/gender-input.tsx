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
        id="gender"
        name="gender"
        className="w-full border-slate-600/50 rounded-lg "
        {...data}
      >
        <SelectValue className="" placeholder="Select a Category" />
      </SelectTrigger>
      <SelectContent className="rounded-lg border-slate-600/50 ">
        <SelectGroup>
          <SelectItem value="AUDIO AND VISUAL EQUIPMENT AND SUPPLIES		">
            AUDIO AND VISUAL EQUIPMENT AND SUPPLIES
          </SelectItem>
          <SelectItem value="BATTERIES AND CELLS AND ACCESSORIES		">
            BATTERIES AND CELLS AND ACCESSORIES
          </SelectItem>
          <SelectItem value="CLEANING EQUIPMENT AND SUPPLIES		">
            CLEANING EQUIPMENT AND SUPPLIES 15 47131812-AF-A01
          </SelectItem>
          <SelectItem value="COLOR COMPOUNDS AND DISPERSIONS				">
            COLOR COMPOUNDS AND DISPERSIONS
          </SelectItem>
          <SelectItem value="CONSUMER ELECTRONICS			">
            CONSUMER ELECTRONICS
          </SelectItem>
          <SelectItem value="FACE MASK			">FACE MASK</SelectItem>
          <SelectItem value="FIRE FIGHTING EQUIPMENT		">
            FIRE FIGHTING EQUIPMENT
          </SelectItem>
          <SelectItem value="FLAG OR ACCESSORIES			">
            FLAG OR ACCESSORIES
          </SelectItem>
          <SelectItem value="  FURNITURE AND FURNISHINGS				">
            FURNITURE AND FURNISHINGS
          </SelectItem>
          <SelectItem value="  HEATING AND VENTILATION AND AIR CIRCULATION					">
            HEATING AND VENTILATION AND AIR CIRCULATION
          </SelectItem>
          <SelectItem value="  INFORMATION AND COMMUNICATION TECHNOLOGY (ICT) EQUIPMENT AND DEVICES AND ACCESSORIES					">
            INFORMATION AND COMMUNICATION TECHNOLOGY (ICT) EQUIPMENT AND DEVICES
            AND ACCESSORIES
          </SelectItem>
          <SelectItem value="  LIGHTING AND FIXTURES AND ACCESSORIES					">
            LIGHTING AND FIXTURES AND ACCESSORIES
          </SelectItem>
          <SelectItem value="  MANUFACTURING COMPONENTS AND SUPPLIES					">
            MANUFACTURING COMPONENTS AND SUPPLIES
          </SelectItem>
          <SelectItem value="  MEASURING AND OBSERVING AND TESTING EQUIPMENT					">
            MEASURING AND OBSERVING AND TESTING EQUIPMENT
          </SelectItem>
          <SelectItem value="  OFFICE EQUIPMENT AND ACCESSORIES AND SUPPLIES					">
            OFFICE EQUIPMENT AND ACCESSORIES AND SUPPLIES
          </SelectItem>
          <SelectItem value="  PAPER MATERIALS AND PRODUCTS				">
            PAPER MATERIALS AND PRODUCTS
          </SelectItem>
          <SelectItem value="  PERFUMES OR COLOGNES OR FRAGRANCES					">
            PERFUMES OR COLOGNES OR FRAGRANCES
          </SelectItem>
          <SelectItem value="  PESTICIDES OR PEST REPELLENTS				">
            PESTICIDES OR PEST REPELLENTS
          </SelectItem>
          <SelectItem value="  PRINTED PUBLICATIONS				">
            PRINTED PUBLICATIONS{" "}
          </SelectItem>
          <SelectItem value="  PRINTER OR FACSIMILE OR PHOTOCOPIER SUPPLIES (CONSUMABLES)					">
            PRINTER OR FACSIMILE OR PHOTOCOPIER SUPPLIES (CONSUMABLES)
          </SelectItem>
          <SelectItem value="  SOFTWARE				">SOFTWARE </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
