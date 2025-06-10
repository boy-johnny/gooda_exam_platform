import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy } from "lucide-react";
const tabs = [
  {
    name: "年度",
    value: "year",
    content: "年度",
  },
  {
    name: "科目",
    value: "subject",
    content: "科目",
  },
  {
    name: "章節",
    value: "chapter",
    content: "章節",
  },
];
export default function SessionTabs() {
  return (
    <Tabs defaultValue={tabs[0].value} className="max-w-xs w-full">
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            <code className="text-[13px]">{tab.name}</code>
          </TabsTrigger>
        ))}
      </TabsList>
      {/* {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <div className="h-10 flex items-center justify-between border gap-2 rounded-md pl-3 pr-1.5">
            <code className="text-[13px]">{tab.content}</code>
            <Button size="icon" variant="secondary" className="h-7 w-7">
              <Copy className="!h-3.5 !w-3.5" />
            </Button>
          </div>
        </TabsContent>
      ))} */}
    </Tabs>
  );
}
