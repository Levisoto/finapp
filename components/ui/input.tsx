import { useState, useLayoutEffect, FC, ChangeEvent } from "react";
import * as React from "react";

import { cn } from "utils/style";

import { FormControl, FormItem, FormLabel, FormMessage } from "./form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

export interface InputBaseProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputBase = React.forwardRef<HTMLInputElement, InputBaseProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
InputBase.displayName = "Input";

interface InputProps extends InputBaseProps {
  label: string;
}

export const Input: FC<InputProps> = ({ className, label, type, ...field }) => {
  if (type === "file") {
    const { value, onChange, ...rest } = field;

    const handleSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
      const { files } = event.currentTarget;
      const selectedFiles = files as FileList;
      const item = selectedFiles.item(0);
      if (item) {
        //@ts-ignore
        onChange(item);
      }
    };
    return (
      <FormItem className={className}>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <InputBase
            className="
            w-full
            h-9
            rounded-md border border-input
            accent-primary
          "
            placeholder="Seleccione un archivo..."
            type={type}
            onChange={handleSelectFile}
            // value={value}
            {...rest}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  }
  if (type === "checkbox") {
    return (
      <FormItem className={className}>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <InputBase
            className="
            h-9
            rounded-md border border-input
            accent-primary
          "
            placeholder="Escriba..."
            type={type}
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  }
  return (
    <FormItem className={className}>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <InputBase
          className="
            h-9 w-full px-3 py-2
            rounded-md border border-input
            text-sm text-on-surface
          "
          placeholder="Escriba..."
          type={type}
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export const InputCustom: FC<InputProps> = ({
  className,
  label,
  type,
  ...field
}) => {
  const options = [
    {
      name: "Si",
      value: "1",
    },
    {
      name: "No",
      value: "0",
    },
  ];

  return (
    <FormItem className={className}>
      <FormLabel>{label}</FormLabel>
      <div className="flex gap-2">
        <Select
          onOpenChange={(a) => console.log(a)}
          onValueChange={field.onChange as any}
          defaultValue={String(field.value as any)}
          value={String(field.value) as any}
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione..." />
            </SelectTrigger>
          </FormControl>
          <SelectContent className="max-h-96">
            {options.map(({ value, name }) => (
              <SelectItem key={value} value={value}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormControl>
          <InputBase
            className="
            h-9 w-full px-3 py-2
            rounded-md border border-input
            text-sm text-on-surface
          "
            placeholder="Escriba..."
            type={type}
            {...field}
          />
        </FormControl>
      </div>
      <FormMessage />
    </FormItem>
  );
};

type Option = {
  value: string;
  label: string;
};

interface SelectInputProps extends InputBaseProps {
  label: string;
  loadingOptions?: () => Promise<Option[]>;
  loading?: boolean;
  options?: Option[];
  loaded?: boolean;
}

export const SelectInput: FC<SelectInputProps> = ({
  label,
  loadingOptions,
  loading,
  loaded,
  options: optionsData = [],
  className,
  defaultValue,
  ...field
}) => {
  const [options, setOptions] = useState<Option[]>(optionsData);

  useLayoutEffect(() => {
    (async () => {
      try {
        if (loaded && loadingOptions) {
          const ops = await loadingOptions();
          setOptions(ops);
        }
      } catch (error) {
        return [];
      }
    })();
  }, []);

  const handleLoadingOptions = async (a: boolean) => {
    try {
      if (loading && loadingOptions && a) {
        const ops = await loadingOptions();
        setOptions(ops);
      }
    } catch (error) {
      return [];
    }
  };

  return (
    <FormItem className={className}>
      <FormLabel>{label}</FormLabel>
      <Select
        onOpenChange={(a) => handleLoadingOptions(a)}
        onValueChange={field.onChange as any}
        defaultValue={String(field.value as any)}
        value={String(field.value) as any}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Seleccione..." />
          </SelectTrigger>
        </FormControl>
        <FormMessage />
        <SelectContent className="max-h-96">
          {options.map(({ value, label: name }) => (
            <SelectItem key={value} value={value}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormItem>
  );
};
