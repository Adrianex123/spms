import { DataTable } from "./departments-table/data-table";
import { initateColumns } from "./departments-table/columns";
import { useSelector } from "react-redux";

export default function DepartmentContent({
  dataDepartments,
}: {
  dataDepartments: any[];
}) {
  const departmentsSlice = useSelector((state: any) => state.departments);

  return (
    <div className="w-full h-full">
      {dataDepartments.length === 0 ? (
        "Fetching Data..."
      ) : (
        <DataTable
          columns={initateColumns(departmentsSlice)}
          data={dataDepartments}
        />
      )}
    </div>
  );
}
