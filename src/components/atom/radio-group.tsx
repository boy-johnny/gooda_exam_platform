interface RadioOption {
  name: string;
  description: string;
  selected?: boolean;
}

interface RadioGroupProps {
  options: RadioOption[];
  name: string;
  onChange?: (value: string) => void;
  ariaLabel?: string;
}

/**
 * RadioGroup component for displaying a list of radio options
 * @param options - Array of radio options with name, description and selected state
 * @param name - Name attribute for the radio group
 * @param onChange - Optional callback function when selection changes
 * @param ariaLabel - Optional aria-label for accessibility
 */
export function RadioGroup({
  options,
  name,
  onChange,
  ariaLabel = "Radio options",
}: RadioGroupProps) {
  return (
    <fieldset
      aria-label={ariaLabel}
      className="-space-y-px rounded-md bg-white"
    >
      {options.map((option) => (
        <label
          key={option.name}
          aria-label={option.name}
          aria-description={option.description}
          className="group flex cursor-pointer border border-gray-200 p-4 first:rounded-tl-md first:rounded-tr-md last:rounded-br-md last:rounded-bl-md focus:outline-hidden has-checked:relative has-checked:border-indigo-200 has-checked:bg-indigo-50"
        >
          <input
            value={option.name}
            defaultChecked={option.selected}
            name={name}
            type="radio"
            onChange={(e) => onChange?.(e.target.value)}
            className="relative mt-0.5 size-4 shrink-0 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
          />
          <span className="ml-3 flex flex-col">
            <span className="block text-sm font-medium text-gray-900 group-has-checked:text-indigo-900">
              {option.name}
            </span>
            <span className="block text-sm text-gray-500 group-has-checked:text-indigo-700">
              {option.description}
            </span>
          </span>
        </label>
      ))}
    </fieldset>
  );
}

export default RadioGroup;
