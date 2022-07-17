import { Button, Input } from "antd";
import { placeholders, texts } from "content/string";
import { MouseEventHandler, useMemo, useState } from "react";
import Autocomplete from "./Autocomplete/Autocomplete";
import css from "./ProductCard.module.scss";
import { debounce } from "lodash";
import { observer } from "mobx-react-lite";
import { loadPredictions } from "fetcher";
import cn from "classnames";

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
    if (name === "name") {
      const predict = await loadPredictions(value);
      if (predict) {
        console.log(predict);
        Object.entries(predict).forEach(([k, v]) => {
          console.log(k, v);
          const options = (v as string[]).map((item: string) => ({
            value: item,
            label: item,
          }));
          updateOptions(k, options);
        });
      }
    }
    updateOptions(name, [...options[name], { value: value, label: value }]);
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
      {Object.entries(inputs).map(([k, v]) =>
        ["tnved1", "tnved2", "id", "reglament", "group"].includes(k) ? (
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
        ) : (
          <Input
            className={k === "name" ? cn(css.input, css.primary) : css.input}
            key={k}
            name={k}
            value={v}
            placeholder={placeholders[k as Fields]}
            onChange={(e) =>
              onInputChange(e.currentTarget.name, e.currentTarget.value)
            }
          />
        )
      )}
      <Button type="primary" className={css.submit} onClick={handleSubmit}>
        Отправить
      </Button>
    </form>
  );
});

export default ProductCard;
