import { Input } from "antd";
import { placeholders, texts } from "content/string";
import { makeAutoObservable } from "mobx";
import { FormEvent, useCallback, useMemo, useState } from "react";
import Autocomplete from "./Autocomplete/Autocomplete";
import css from "./ProductCard.module.scss";
import { debounce } from "lodash";

interface Props {}

const defaultInputs = {
  id: null,
  codesTn: [null, null],
  reglament: null,
  group: null,
  name: null,
  lab: null,
  reporter: null,
  reporterAddress: null,
  manufacturer: null,
  manufacturerAdress: null,
  country: null,
};

const ProductCard = (props: Props) => {
  const [options, setOptions] = useState<{
    [key in keyof typeof placeholders]: { value: string; label: string }[];
  }>({
    id: [],
    codesTn: [],
    reglament: [],
    group: [],
    name: [],
    lab: [],
    reporter: [],
    reporterAddress: [],
    manufacturer: [],
    manufacturerAdress: [],
    country: [],
  });

  // local state for autocomplete
  const [inputs, setInputs] = useState<{
    [key in keyof typeof placeholders]: string | string[] | null[] | null;
  }>(defaultInputs);

  const loadOptions = (name: keyof typeof placeholders, value: string) => {
    console.log("loading");
    const normalizedName = name.includes("codesTn") ? name.slice(0, -1) : name;

    setOptions((state) => ({
      ...state,
      [normalizedName]: [
        { value: value, label: value },
        { value: value.repeat(2), label: value.repeat(2) },
      ],
      country: [
        { value: "ru", label: "RU" },
        { value: "en", label: "EN" },
      ],
    }));
  };

  const debouncedLoadOptions = useMemo(() => debounce(loadOptions, 300), []);

  const onInputChange = (name: string, value: string | null) => {
    if (!value) return;
    if (!name.includes("codes")) {
      setInputs((state) => ({ ...state, [name]: value }));
    } else if (name.includes("codesTn")) {
      // проверим, какой элемент массива меняется
      const newCodes = name.includes("0")
        ? [value, inputs.codesTn?.[1] || ""]
        : [inputs.codesTn?.[0] || "", value];
      console.log("working update", newCodes);
      setInputs((state) => ({ ...state, codesTn: newCodes }));
    }
    debouncedLoadOptions(name as keyof typeof placeholders, value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.table(inputs);
    setInputs(defaultInputs);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.header}>{texts.productCardHeader}</div>
      {Object.entries(inputs).map(([k, v]) =>
        k === "codesTn" ? (
          <div className={css.flex} key={k}>
            <Autocomplete
              options={options[k]}
              className={css.input}
              name={`${k}0`}
              value={v?.[0] || null}
              placeholder={placeholders[k]}
              onInputChange={onInputChange}
            />
            <Autocomplete
              options={options[k]}
              className={css.input}
              name={`${k}1`}
              value={v?.[0] || null}
              placeholder={placeholders[k]}
              onInputChange={onInputChange}
            />
          </div>
        ) : // не будем показывать поле "лаборатория" при вводе товара
        k === "lab" ? null : (
          <Autocomplete
            key={k}
            options={options[k as keyof typeof placeholders]}
            className={css.input}
            name={k}
            value={v as string}
            placeholder={placeholders[k as keyof typeof placeholders]}
            onInputChange={onInputChange}
          />
        )
      )}
      <Input type="submit" value="Отправить" />
    </form>
  );
};

export default ProductCard;
