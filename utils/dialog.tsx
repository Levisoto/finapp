import {
  FC,
  createContext,
  useContext,
  useState,
  PropsWithChildren,
} from "react";
import {
  Dialog as DialogComponent,
  DialogContent,
  DialogDescription,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "components/ui";

export type Dialog = {
  name: string;
  component: any;
  title?: string;
  description?: string;
};

type UseDialog = PropsWithChildren & {
  dialogs: Dialog[];
};

interface UsePopup {
  dialog: string;
  options?: any;
}

export type DialogContextType = {
  openDialog: <T>(a: string, options: T) => void;
  closeDialog: () => void;
};

const DialogContext = createContext<DialogContextType>({
  openDialog: () => undefined,
  closeDialog: () => undefined,
});

const defaultOptions = {
  dialog: "",
  options: {},
};

export const DialogProvider: FC<UseDialog> = ({ children, dialogs }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [popup, setPopup] = useState<UsePopup>(defaultOptions);

  const dialog = dialogs.find(({ name }) => name === popup.dialog) || {
    component: () => <></>,
    name: "",
    title: "",
  };

  const onClose = () => {
    setPopup(defaultOptions);
    setOpen(false);
  };

  return (
    <DialogContext.Provider
      value={{
        openDialog: (name, options) => {
          const exists = dialogs.map((v) => v.name).includes(name);
          if (exists) {
            setPopup((_) => ({ dialog: name, options }));
            setOpen(true);
          }
        },
        closeDialog: onClose,
      }}
    >
      {children}
      <DialogComponent open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[825px]">
          <DialogHeader>
            {dialog.title && <DialogTitle>{dialog.title}</DialogTitle>}
            {dialog.description && (
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            )}
          </DialogHeader>
          <dialog.component {...popup.options} />
        </DialogContent>
      </DialogComponent>
    </DialogContext.Provider>
  );
};

export const useDialog = () => useContext(DialogContext);

export default DialogContext;
