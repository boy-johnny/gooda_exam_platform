import { Loader2 } from "lucide-react";

export default function Loading() {
  // 你可以建立任何你喜歡的載入中 UI
  // 這裡我們建立一個簡單的、置中的 spinner
  return (
    <div className="flex h-[50vh] w-full items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
    </div>
  );
}
