/**
 * BentoGrid 卡片項目介面
 */
interface BentoGridItem {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imagePosition?: "left" | "right";
  colSpan?: number;
  rounded?: {
    top?: boolean;
    bottom?: boolean;
    left?: boolean;
    right?: boolean;
  };
}

/**
 * BentoGrid 組件屬性介面
 */
interface BentoGridProps {
  /**
   * 標題
   */
  title: string;
  /**
   * 副標題
   */
  subtitle: string;
  /**
   * 卡片項目列表
   */
  items: BentoGridItem[];
}

/**
 * BentoGrid 組件
 * @param props 組件屬性
 * @returns BentoGrid 組件
 */
export function BentoGrid({ title, subtitle, items }: BentoGridProps) {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-base/7 font-semibold text-indigo-600">{title}</h2>
        <p className="mt-2 max-w-lg text-4xl font-semibold tracking-tight text-pretty text-gray-950 sm:text-5xl">
          {subtitle}
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          {items.map((item, index) => (
            <div
              key={index}
              className={`relative lg:col-span-${item.colSpan || 2}`}
            >
              <div
                className={`absolute inset-px rounded-lg bg-white ${
                  item.rounded?.top ? "max-lg:rounded-t-4xl" : ""
                } ${item.rounded?.left ? "lg:rounded-tl-4xl" : ""} ${
                  item.rounded?.right ? "lg:rounded-tr-4xl" : ""
                } ${
                  item.rounded?.bottom
                    ? "max-lg:rounded-b-4xl lg:rounded-br-4xl"
                    : ""
                }`}
              />
              <div
                className={`relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] ${
                  item.rounded?.top ? "max-lg:rounded-t-[calc(2rem+1px)]" : ""
                } ${
                  item.rounded?.left ? "lg:rounded-tl-[calc(2rem+1px)]" : ""
                } ${
                  item.rounded?.right ? "lg:rounded-tr-[calc(2rem+1px)]" : ""
                } ${
                  item.rounded?.bottom
                    ? "max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]"
                    : ""
                }`}
              >
                <img
                  alt=""
                  src={item.image}
                  className={`h-80 object-cover ${
                    item.imagePosition === "right"
                      ? "lg:object-right"
                      : "object-left"
                  }`}
                />
                <div className="p-10 pt-4">
                  <h3 className="text-sm/4 font-semibold text-indigo-600">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
                    {item.subtitle}
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
              <div
                className={`pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 ${
                  item.rounded?.top ? "max-lg:rounded-t-4xl" : ""
                } ${item.rounded?.left ? "lg:rounded-tl-4xl" : ""} ${
                  item.rounded?.right ? "lg:rounded-tr-4xl" : ""
                } ${
                  item.rounded?.bottom
                    ? "max-lg:rounded-b-4xl lg:rounded-br-4xl"
                    : ""
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
