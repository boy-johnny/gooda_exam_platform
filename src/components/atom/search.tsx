/**
 * Search component with customizable label and placeholder
 * @param {string} label - Label text for the search input
 * @param {string} placeholder - Placeholder text for the search input
 * @param {string} id - Unique identifier for the search input
 * @param {string} name - Name attribute for the search input
 */

export default function Search({
  label = "Quick search",
  placeholder = "Search...",
  id = "search",
  name = "search",
  children,
}: {
  label?: string;
  placeholder?: string;
  id?: string;
  name?: string;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm/6 font-medium text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <div className="flex rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
          <input
            id={id}
            name={name}
            type="text"
            placeholder={placeholder}
            className="block min-w-0 grow px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          />
          <div className="flex py-1.5 pr-1.5">
            <kbd className="inline-flex items-center rounded-sm border border-gray-200 px-1 font-sans text-xs text-gray-400">
              {children}
            </kbd>
          </div>
        </div>
      </div>
    </div>
  );
}
