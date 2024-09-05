import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import Content from "./Content";


export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-slate-800 border-slate-400 px-4">
      <h1 className="text-xl font-semibold">Chatbot</h1>
      <Content />
      <Button variant="outline" size="sm" className="ml-auto gap-1.5 text-sm hover:bg-slate-400 border-slate-400">
        <Share className="size-3.5" />
        Share
      </Button>
    </header>
  );
}
