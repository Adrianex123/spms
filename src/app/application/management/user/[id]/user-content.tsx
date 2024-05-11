import UpdateEmployeeButton from "./update-employee/update-employee-dialog";
import DeleteEmployeeButton from "./delete-employee/delete-employee-dialog";

export default function UserContent({ employee, roles, departments }: any) {
  return (
    <div className="w-full h-[805px] 2xl:h-[882px] flex flex-col max-w-[1840px] justify-center place-items-center gap-7 py-4">
      <pre>
        <code>{JSON.stringify(employee, null, 2)}</code>
      </pre>
      <div className="w-full flex justify-center">
        <UpdateEmployeeButton
          employee={employee[0]}
          roles={roles}
          departments={departments}
        />
        <DeleteEmployeeButton employeeData={employee[0]} />
      </div>
    </div>
  );
}
