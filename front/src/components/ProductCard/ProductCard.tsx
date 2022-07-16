import { Button } from "antd";
import { placeholders, texts } from "content/string";
import { MouseEventHandler, useMemo, useState } from "react";
import Autocomplete from "./Autocomplete/Autocomplete";
import css from "./ProductCard.module.scss";
import { debounce } from "lodash";
import { observer } from "mobx-react-lite";

export interface IOption {
  value: string;
  label?: string;
}
const defaultInputs = {
  tnved1: "",
  tnved2: "",
  id: "",
  reglament: "",
  group: "",
  name: "",
  lab: "",
  reporter: "",
  reporterAddress: "",
  manufacturer: "",
  manufacturerAdress: "",
  country: "",
};

const defaultOptions: { [key in Fields]: IOption[] } = {
  tnved1: [],
  tnved2: [],
  id: [],
  reglament: [],
  group: [],
  name: [],
  lab: [],
  reporter: [],
  reporterAddress: [],
  manufacturer: [],
  manufacturerAdress: [],
  country: [],
};

export type IOptions = typeof defaultOptions;
export type IInputs = typeof defaultInputs;
export type Fields = keyof typeof defaultInputs;

const ProductCard = observer(() => {
  const [inputs, setInputs] = useState(defaultInputs);
  const [options, setOptions] = useState(defaultOptions);

  const updateInput = (name: string, value: string) => {
    setInputs((state) => ({ ...state, [name]: value }));
  };
  const updateOptions = (name: string, value: IOption[]) => {
    setOptions((state) => ({ ...state, [name]: value }));
  };

  const loadOptions = async (name: Fields, value: string) => {
    console.log("loading");
    if (name === "reglament") {
      fetch("http://51.250.111.56:5000/regulation_predict", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ text: value }),
      })
        .then((res) => res.json)
        .then((data) => console.log(data));
    }
    updateOptions(name, [
      { value: value, label: value },
      { value: value.repeat(2), label: value.repeat(2) },
    ]);
  };

  const debouncedLoadOptions = useMemo(() => debounce(loadOptions, 300), []);

  const onInputChange = (name: string, value: string) => {
    if (!value) return;
    updateInput(name, value);
    debouncedLoadOptions(name as Fields, value);
  };

  const onChange = (name: string, value: any) => {
    updateInput(name, value);
  };

  const handleSubmit: MouseEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    console.log(inputs);
    setInputs(defaultInputs);
    setOptions(defaultOptions);
  };

  return (
    <form className={css.form}>
      <div className={css.header}>{texts.productCardHeader}</div>
      {Object.entries(inputs).map(([k, v]) => (
        <Autocomplete
          key={k}
          options={options[k as Fields]}
          className={css.input}
          name={k}
          value={v as string}
          placeholder={placeholders[k as Fields]}
          onInputChange={onInputChange}
          onChange={onChange}
          // onReset={inputsState.reset}
        />
      ))}
      <Button type="primary" className={css.submit} onClick={handleSubmit}>
        Отправить
      </Button>
    </form>
  );
});

export default ProductCard;
