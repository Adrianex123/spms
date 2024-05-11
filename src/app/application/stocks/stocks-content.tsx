import { DataTable } from "./stocks-table/data-table";
import { initialState as initateColumns } from "./stocks-table/columns";
import { useSelector } from "react-redux";

export default function DepartmentContent({
  dataStocks,
}: {
  dataStocks: any[];
}) {
  const uomsSlice = useSelector((state: any) => state.uoms);

  return (
    <div className="w-full h-full">
      {dataStocks.length === 0 ? (
        "Fetching Data..."
      ) : (
        <DataTable columns={initateColumns(uomsSlice)} data={dataStocks} />
      )}
    </div>
  );
}
