"use client";

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogPanel,
  DialogBackdrop,
} from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

interface Person {
  id: number;
  name: string;
  url: string;
}

interface CommandPaletteProps {
  items: Person[];
  defaultOpen?: boolean;
  onSelect?: (person: Person) => void;
  placeholder?: string;
  emptyMessage?: string;
}

/**
 * CommandPalette component for displaying a searchable dropdown of items
 * @param items - Array of items to display in the palette
 * @param defaultOpen - Whether the palette should be open by default
 * @param onSelect - Optional callback function when an item is selected
 * @param placeholder - Optional placeholder text for the search input
 * @param emptyMessage - Optional message to display when no items are found
 */
export function CommandPalette({
  items,
  defaultOpen = true,
  onSelect,
  placeholder = "Search...",
  emptyMessage = "No people found.",
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(defaultOpen);

  const filteredItems =
    query === ""
      ? []
      : items.filter((item) => {
          return item.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Dialog
      className="relative z-10"
      open={open}
      onClose={() => {
        setOpen(false);
        setQuery("");
      }}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/25 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
        <DialogPanel
          transition
          className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5 transition-all data-closed:scale-95 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        >
          <Combobox
            onChange={(item) => {
              if (item) {
                onSelect?.(item);
                window.location = item.url;
              }
            }}
          >
            <div className="grid grid-cols-1">
              <ComboboxInput
                autoFocus
                className="col-start-1 row-start-1 h-12 w-full pr-4 pl-11 text-base text-gray-900 outline-hidden placeholder:text-gray-400 sm:text-sm"
                placeholder={placeholder}
                onChange={(event) => setQuery(event.target.value)}
                onBlur={() => setQuery("")}
              />
              <MagnifyingGlassIcon
                className="pointer-events-none col-start-1 row-start-1 ml-4 size-5 self-center text-gray-400"
                aria-hidden="true"
              />
            </div>

            {filteredItems.length > 0 && (
              <ComboboxOptions
                static
                className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
              >
                {filteredItems.map((item) => (
                  <ComboboxOption
                    key={item.id}
                    value={item}
                    className="cursor-default px-4 py-2 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                  >
                    {item.name}
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            )}

            {query !== "" && filteredItems.length === 0 && (
              <p className="p-4 text-sm text-gray-500">{emptyMessage}</p>
            )}
          </Combobox>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
