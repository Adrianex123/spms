import UpdateStockButton from "./update-stock/update-stock-dialog";
import DeleteStockButton from "./delete-stock/delete-stock-dialog";

export default function UserContent({ stock, uoms }: any) {
  return (
    <div className="w-full h-[805px] 2xl:h-[882px] flex flex-col max-w-[1840px] justify-center place-items-center gap-7 py-4">
      <pre>
        <code>{JSON.stringify(stock, null, 2)}</code>
      </pre>
      <div className="w-full flex justify-center">
        <UpdateStockButton stock={stock[0]} uoms={uoms} />
        <DeleteStockButton stock={stock[0]} />
      </div>
    </div>
  );
}
