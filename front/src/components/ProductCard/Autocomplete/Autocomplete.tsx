import cn from "classnames";
import { observer } from "mobx-react-lite";
import Select, { Options, OptionsOrGroups } from "react-select";
import { inputsState, IOption } from "../state";
import css from "./Autocomplete.module.scss";

interface Props {
  options: any;
  name: string;
  value: string | null;
  placeholder: string;
  className?: string;
  onInputChange: (name: string, value: string) => void;
}

const Autocomplete = observer(
  ({ options, name, placeholder, value, className, onInputChange }: Props) => {
    //@ts-ignore
    const state = inputsState[name];

    const onChange = (value: any) => {
      console.log("onChange", name, value);
      if (value === null) inputsState.update(name, "");
      else inputsState.update(name, value);
    };

    // const optionsLoaded = options.length > 0 ? css.optionsLoaded : "";

    const customStyles = {
      control: (provided: any) => ({
        ...provided,
        borderColor: options.length > 0 ? "green" : "gray",
        borderWidth: options.length > 0 ? 1.5 : 1,
      }),
    };

    console.log({ name, state, value, options });

    return (
      <Select
        defaultValue={""}
        isClearable
        className={cn(css.select, className)}
        onChange={onChange}
        onInputChange={onInputChange.bind(null, name)}
        value={state || value}
        options={options}
        placeholder={placeholder}
        styles={customStyles}
      />
    );
  }
);

export default Autocomplete;
