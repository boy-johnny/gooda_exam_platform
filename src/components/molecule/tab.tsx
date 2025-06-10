import { ChevronDownIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

interface TabItem {
  name: string;
  href: string;
  current: boolean;
}

interface TabProps {
  tabs: TabItem[];
  onTabChange?: (tab: TabItem) => void;
}

/**
 * Tab component for displaying and switching between different sections
 * @param tabs - Array of tab items with name, href and current status
 * @param onTabChange - Optional callback function when tab is changed
 */
export function Tab({ tabs, onTabChange }: TabProps) {
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  const handleTabChange = (tab: TabItem) => {
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:hidden">
        <select
          defaultValue={tabs.find((tab) => tab.current)?.name}
          onChange={(e) => {
            const selectedTab = tabs.find((tab) => tab.name === e.target.value);
            if (selectedTab) handleTabChange(selectedTab);
          }}
          aria-label="Select a tab"
          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
        />
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav aria-label="Tabs" className="-mb-px flex">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleTabChange(tab);
                }}
                aria-current={tab.current ? "page" : undefined}
                className={classNames(
                  tab.current
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "w-1/4 border-b-2 px-1 py-4 text-center text-sm font-medium"
                )}
              >
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
