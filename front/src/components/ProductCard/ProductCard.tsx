import { Button } from "antd";
import { placeholders, texts } from "content/string";
import { FormEvent, useContext, useMemo, useState } from "react";
import Autocomplete from "./Autocomplete/Autocomplete";
import css from "./ProductCard.module.scss";
import { debounce } from "lodash";
import { Fields, InputsContext, inputsState } from "./state";
import { observer } from "mobx-react-lite";

// const inputs = inputsState;
const ProductCard = observer(() => {
  const inputsState = useContext(InputsContext);
  const [options, setOptions] = useState<{
    [key: string]: { value: string; label: string }[];
  }>({
    tnved1: [],
    tnved2: [],
    id: [],
    reglament: [],
    group: [],
    name: [],
  });

  const loadOptions = (name: Fields, value: string) => {
    console.log("loading");
    setOptions((state) => ({
      ...state,
      [name]: [
        { value: value, label: value },
        { value: value.repeat(2), label: value.repeat(2) },
      ],
    }));
  };

  const debouncedLoadOptions = useMemo(() => debounce(loadOptions, 300), []);

  const onInputChange = (name: string, value: string) => {
    // if (!value) return;
    inputsState.update(name, value);
    debouncedLoadOptions(name as Fields, value);
  };

  //@ts-ignore
  const onChange = (name: string, value: any) => {
    //   console.log("onChange", name, value);
    if (value === null) inputsState.update(name, "");
    else inputsState.update(name, value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.table(inputsState.inputs);
    inputsState.reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.header}>{texts.productCardHeader}</div>
      {Object.entries(inputsState.inputs).map(([k, v]) => (
        <Autocomplete
          key={k}
          options={options[k as Fields]}
          className={css.input}
          name={k}
          value={v as string}
          placeholder={placeholders[k as Fields]}
          onInputChange={onInputChange}
          onChange={onChange}
        />
      ))}
      <Button type="primary" className={css.submit}>
        Отправить
      </Button>
    </form>
  );
});

export default ProductCard;
