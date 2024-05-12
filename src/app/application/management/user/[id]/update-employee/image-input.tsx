import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ImageInput({ data }: { data: any }) {
  return (
    <div className="w-full flex place-items-center justify-center gap-2 mb-5">
      <Avatar className="w-20 h-20 rounded-lg  cursor-pointer z-0">
        <AvatarImage className="rounded-lg" src={""} alt={"something"} />
        <AvatarFallback className="bg-darkBg rounded-lg">CB</AvatarFallback>
      </Avatar>
      <div className="w-full h-full flex flex-col gap-2">
        <Label className="text-xs">Profile Picture</Label>
        <span className="text-xs text-muted-foreground">
          We support PNGs, JPEGs under 5MB
        </span>
        <Input
          type="file"
          accept="image/*"
          {...data}
          className=" text-xs w-fit h-fit bg-transparent border-none file:px-4 file:py-2 text-slate-500 p-0 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-lightComponentBg file:text-black hover:file:bg-white hover:file:text-black cursor-pointer file:hover:cursor-pointer file:transition-all file:duration-300"
        />
      </div>
    </div>
  );
}
