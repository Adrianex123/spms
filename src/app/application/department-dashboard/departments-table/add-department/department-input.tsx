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
        <SelectValue className="" placeholder="Select a Department" />
      </SelectTrigger>
      <SelectContent className="rounded-lg border-slate-600/50">
        <SelectGroup>
          <SelectItem value=" Alumni Affairs Office">
            Alumni Affairs Office
          </SelectItem>
          <SelectItem value="Dental Office">Dental Office</SelectItem>
          <SelectItem value="GAD">GAD</SelectItem>
          <SelectItem value="Guidance/CARE Office">
            Guidance/CARE Office
          </SelectItem>
          <SelectItem value="IGP Office">IGP Office</SelectItem>
          <SelectItem value="IMD Office">IMD Office</SelectItem>
          <SelectItem value=" Information and Communication Technology Office">
            Information and Communication Technology Office
          </SelectItem>
          <SelectItem value=" Information and Publicity">
            Information and Publicity
          </SelectItem>
          <SelectItem value="Library Office">Library Office</SelectItem>
          <SelectItem value="Medical Office">Medical Office</SelectItem>
          <SelectItem value="Mini- Hotel">Mini- Hotel</SelectItem>
          <SelectItem
            value="            Motor Pool/Vehicle Operations & Maintenance
"
          >
            Motor Pool/Vehicle Operations & Maintenance
          </SelectItem>
          <SelectItem value="NSF Office">NSF Office</SelectItem>
          <SelectItem value="NSTP/ ROTC Office">NSTP/ ROTC Office</SelectItem>
          <SelectItem value="Planning Office">Planning Office</SelectItem>
          <SelectItem value="QUAMC Office">QUAMC Office</SelectItem>
          <SelectItem value="Registrar's Office">Registrar's Office</SelectItem>
          <SelectItem value="Scholarship Office">Scholarship Office</SelectItem>
          <SelectItem
            value="            Student Affairs Services Office
"
          >
            Student Affairs Services Office
          </SelectItem>
          <SelectItem
            value="            Student Government (SG) 1 Office
"
          >
            Student Government (SG) 1 Office
          </SelectItem>
          <SelectItem
            value="            Student Government (SG) 2 Office
"
          >
            Student Government (SG) 2 Office
          </SelectItem>
          <SelectItem value="Student Publication/ The Norsunan Office">
            Student Publication/ The Norsunan Office
          </SelectItem>
          <SelectItem value="Yearbook">Yearbook</SelectItem>
          <SelectItem value="Other STO Services">Other STO Services</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectItem value=" University Presidents Office">
            University Presidents Office
          </SelectItem>
          <SelectItem value=" VP- Administration, Planning and Development Office">
            VP- Administration, Planning and Development Office
          </SelectItem>
          <SelectItem value="VP REXIL (Extension)">
            VP REXIL (Extension)
          </SelectItem>
          <SelectItem value="Board Secretary Office">
            Board Secretary Office
          </SelectItem>
          <SelectItem value="Campus Administrators Office">
            Campus Administrators Office
          </SelectItem>
          <SelectItem value="Chief Administrative Officer- Administration">
            Chief Administrative Officer- Administration
          </SelectItem>
          <SelectItem value=" Chief Administrative Officer-Finance">
            Chief Administrative Officer-Finance
          </SelectItem>
          <SelectItem value="Accounting Office">Accounting Office</SelectItem>
          <SelectItem value="Admin/ HR Office">Admin/ HR Office</SelectItem>
          <SelectItem value=" Bids and Awards (BAC) Office">
            Bids and Awards (BAC) Office
          </SelectItem>
          <SelectItem value="Budget Office">Budget Office</SelectItem>
          <SelectItem value="Buildings and Grounds Office">
            Buildings and Grounds Office
          </SelectItem>
          <SelectItem value="Cashiers Office">Cashiers Office</SelectItem>
          <SelectItem value="Commission on Audit (COA) Office">
            Commission on Audit (COA) Office
          </SelectItem>
          <SelectItem value="Engineers Office">Engineers Office</SelectItem>
          <SelectItem value="Internal Audit Office">
            Internal Audit Office
          </SelectItem>
          <SelectItem value="Supply Office">Supply Office</SelectItem>
          <SelectItem value="Other GASS<">Other GASS</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
``;
