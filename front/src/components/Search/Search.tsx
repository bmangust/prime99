import { Checkbox, DatePicker, Input, Radio, Space } from "antd";
import { texts } from "content/string";
import { ChangeEvent, useState } from "react";
import css from "./Search.module.scss";

const Search = () => {
  const [value, setValue] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };
  return (
    <div className={css.search}>
      <div className={css.header}>{texts.search}</div>
      <Input.Search
        className={css.input}
        value={value}
        onChange={handleChange}
        placeholder={texts.searchPlaceholder}
      />
      <DatePicker className={css.input} placeholder="от" />
      <DatePicker className={css.input} placeholder="до" />
      <Space direction="vertical" align="start">
        <Space className={css.space} direction="vertical" size="middle">
          <Checkbox value={false}>Фильтр 1</Checkbox>
          <Checkbox value={false}>Фильтр 2</Checkbox>
          <Checkbox value={true}>Фильтр 3</Checkbox>
        </Space>
        <Space className={css.space} direction="vertical" size="middle">
          <Radio value={false}>Опция 1</Radio>
          <Radio value={true}>Опция 2</Radio>
          <Radio value={false}>Опция 3</Radio>
        </Space>
      </Space>
    </div>
  );
};

export default Search;
