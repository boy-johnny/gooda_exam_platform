import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// 1. 定義 props 的型別
interface SessionTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const tabs = [
  { name: "年度", value: "year" },
  { name: "科目", value: "subject" },
  { name: "章節", value: "chapter" },
];

export default function SessionTabs({
  activeTab,
  onTabChange,
}: SessionTabsProps) {
  return (
    <Tabs
      value={activeTab}
      onValueChange={onTabChange}
      className="w-full max-w-xs"
    >
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            <code className="text-[13px]">{tab.name}</code>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
