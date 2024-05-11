import UpdateDepartmentButton from "./update-department/update-department-dialog";
import DeleteDepartmentButton from "./delete-department/delete-department-dialog";

export default function UserContent({ department }: any) {
  return (
    <div className="w-full h-[805px] 2xl:h-[882px] flex flex-col max-w-[1840px] justify-center place-items-center gap-7 py-4">
      <pre>
        <code>{JSON.stringify(department, null, 2)}</code>
      </pre>
      <div className="w-full flex justify-center">
        <UpdateDepartmentButton department={department[0]} />
        <DeleteDepartmentButton department={department[0]} />
      </div>
    </div>
  );
}
