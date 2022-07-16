import cn from "classnames";
import { FocusEventHandler, useRef } from "react";
import Select from "react-select";
import css from "./Autocomplete.module.scss";

interface Props {
  options: any;
  name: string;
  value: string;
  placeholder: string;
  className?: string;
  onInputChange: (name: string, value: string) => void;
  onChange: (name: string, value: string | null) => void;
}

const Autocomplete = ({
  options,
  name,
  placeholder,
  value,
  className,
  onChange,
  onInputChange,
}: Props) => {
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      borderColor: options?.length > 0 ? "green" : "gray",
      borderWidth: options?.length > 0 ? 1.5 : 1,
    }),
  };

  return (
    <Select
      defaultValue={""}
      isClearable
      className={cn(css.select, className)}
      onChange={(value: string | null) => onChange(name, value)}
      onInputChange={(value: string) => onInputChange(name, value)}
      value={value}
      options={options}
      placeholder={placeholder}
      styles={customStyles}
    />
  );
};

export default Autocomplete;
