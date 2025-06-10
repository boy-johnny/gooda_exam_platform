"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";

interface ModalDialogProps {
  title?: string;
  description?: string;
  defaultOpen?: boolean;
  trigger?: React.ReactNode;
  onClose?: () => void;
  buttonText?: string;
  icon?: React.ReactNode;
}

/**
 * ModalDialog component for displaying a modal dialog box
 * @param title - Optional title for the dialog
 * @param description - Optional description text
 * @param defaultOpen - Whether the dialog should be open by default
 * @param trigger - Optional custom trigger element to open the dialog
 * @param onClose - Optional callback function when dialog is closed
 * @param buttonText - Optional text for the close button
 * @param icon - Optional icon to display in the dialog
 */
export function ModalDialog({
  title = "Payment successful",
  description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.",
  defaultOpen = false,
  trigger,
  onClose,
  buttonText = "Go back to dashboard",
  icon = <CheckIcon aria-hidden="true" className="size-6 text-green-600" />,
}: ModalDialogProps) {
  const [open, setOpen] = useState(defaultOpen);

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  return (
    <div>
      {trigger || (
        <button
          onClick={() => setOpen(true)}
          className="rounded-md bg-gray-950/5 px-2.5 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-950/10"
        >
          Open dialog
        </button>
      )}
      <Dialog open={open} onClose={handleClose} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div>
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-100">
                  {icon}
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-gray-900"
                  >
                    {title}
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{description}</p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  onClick={handleClose}
                  className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {buttonText}
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
