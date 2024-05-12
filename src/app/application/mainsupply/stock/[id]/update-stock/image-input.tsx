import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ImageInput({ data }: { data: any }) {
  return (
    <Avatar className="w-36 h-36 rounded-lg  cursor-pointer z-0">
      <AvatarImage className="rounded-lg" src={""} alt={"something"} />
      <AvatarFallback className="bg-slate-400 rounded-lg text-black">
        +
      </AvatarFallback>
    </Avatar>
  );
}
