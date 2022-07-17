import { Input } from "antd";
import { texts } from "content/string";
import { throttle } from "lodash";
import { ChangeEvent, useContext, useMemo, useState } from "react";
import { searchResults } from "fetcher";
import css from "./Search.module.scss";
import { SearchContext } from "state/SearchState";

const Search = () => {
  const searchContext = useContext(SearchContext);
  const [inputs, setInputs] = useState({
    text: "",
    limit: "10",
  });

  const debouncedSearchResults = useMemo(
    () => throttle(searchResults, 300),
    []
  );

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;
    setInputs({ ...inputs, [name]: value });

    const searchResult =
      name === "text"
        ? await debouncedSearchResults(value, +inputs.limit)
        : await debouncedSearchResults(inputs.text, +value);
    if (searchResult) {
      console.log(searchResult);

      searchContext.saveResuts(searchResult);
    }
  };

  return (
    <div className={css.search}>
      <div className={css.header}>{texts.search}</div>
      <Input.Search
        name="text"
        className={css.input}
        value={inputs.text}
        onChange={handleChange}
        placeholder={texts.searchPlaceholder}
      />
      <Input
        name="limit"
        type="number"
        className={css.input}
        value={inputs.limit}
        onChange={handleChange}
        placeholder={texts.limitPlaceholder}
      />
      {/* <DatePicker className={css.input} placeholder="от" />
      <DatePicker className={css.input} placeholder="до" />
      <Space direction="vertical" align="start">
        <Space className={css.space} direction="vertical" size="middle">
          <Checkbox checked={false}>Фильтр 1</Checkbox>
          <Checkbox checked={false}>Фильтр 2</Checkbox>
          <Checkbox checked={true}>Фильтр 3</Checkbox>
        </Space>
        <Space className={css.space} direction="vertical" size="middle">
          <Radio value={false}>Опция 1</Radio>
          <Radio value={true}>Опция 2</Radio>
          <Radio value={false}>Опция 3</Radio>
        </Space>
      </Space> */}
    </div>
  );
};

export default Search;
