"use client";

import { useState } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";

interface Option {
  name: string;
  username: string;
}

interface SelectProps {
  options: Option[];
  label?: string;
  defaultValue?: Option;
  onChange?: (value: Option) => void;
  className?: string;
}

/**
 * Select component for displaying a dropdown list of options
 * @param options - Array of options with name and username
 * @param label - Optional label text for the select
 * @param defaultValue - Optional default selected option
 * @param onChange - Optional callback function when selection changes
 * @param className - Optional additional CSS classes
 */
export function Select({
  options,
  label = "Select an option",
  defaultValue,
  onChange,
  className = "",
}: SelectProps) {
  const [selected, setSelected] = useState<Option>(defaultValue || options[0]);

  const handleChange = (value: Option) => {
    setSelected(value);
    onChange?.(value);
  };

  return (
    <Listbox value={selected} onChange={handleChange}>
      <Label className="block text-sm/6 font-medium text-gray-900">
        {label}
      </Label>
      <div className="relative mt-2">
        <ListboxButton
          className={`grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${className}`}
        >
          <span className="col-start-1 row-start-1 flex w-full gap-2 pr-6">
            <span className="truncate">{selected.name}</span>
            <span className="truncate text-gray-500">{selected.username}</span>
          </span>
          <ChevronUpDownIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
        >
          {options.map((option) => (
            <ListboxOption
              key={option.username}
              value={option}
              className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
            >
              <div className="flex">
                <span className="truncate font-normal group-data-selected:font-semibold">
                  {option.name}
                </span>
                <span className="ml-2 truncate text-gray-500 group-data-focus:text-indigo-200">
                  {option.username}
                </span>
              </div>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                <CheckIcon aria-hidden="true" className="size-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}

export default Select;
