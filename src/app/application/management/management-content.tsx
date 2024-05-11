import { DataTable } from "./employees-table/data-table";
import { initateColumns } from "./employees-table/columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmployeeDisplay } from "@/types";
import { useSelector } from "react-redux";
import laoding from "@/images/Iphone-spinner-2.gif";

export default function ManagementContent({
  dataEmployees,
}: {
  dataEmployees: EmployeeDisplay[];
}) {
  const departmentsSlice = useSelector((state: any) => state.departments);
  const rolesSlice = useSelector((state: any) => state.roles);

  return (
    <div className="w-full h-full">
      {dataEmployees.length === 0 ? (
        "Fetching data ............."
      ) : (
        <DataTable
          columns={initateColumns(departmentsSlice, rolesSlice)}
          data={dataEmployees}
        />
      )}
    </div>
  );
}
