// import {
//   CalendarIcon,
//   ChartPieIcon,
//   DocumentDuplicateIcon,
//   FolderIcon,
//   HomeIcon,
//   UsersIcon,
// } from "@heroicons/react/24/outline";

/**
 * 導航項目介面
 */
interface NavigationItem {
  name: string;
  href: string;
  icon: (props: any) => React.ReactNode;
  current: boolean;
}

interface VerticalNavigationProps {
  /**
   * 導航項目列表
   */
  navigation: NavigationItem[];
}

/**
 * 合併多個 class 名稱
 */
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

/**
 * 垂直導航組件
 * @param props 組件屬性
 * @returns 垂直導航組件
 */
export function VerticalNavigation({ navigation }: VerticalNavigationProps) {
  return (
    <nav aria-label="Sidebar" className="flex flex-1 flex-col">
      <ul role="list" className="-mx-2 space-y-1">
        {navigation.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              className={classNames(
                item.current
                  ? "bg-gray-50 text-indigo-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
              )}
            >
              <item.icon
                aria-hidden="true"
                className={classNames(
                  item.current
                    ? "text-indigo-600"
                    : "text-gray-400 group-hover:text-indigo-600",
                  "size-6 shrink-0"
                )}
              />
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
