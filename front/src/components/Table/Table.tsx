import { GlobalOutlined } from "@ant-design/icons";
import { Button, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { DataType, SearchContext } from "state/SearchState";
import { ViewContext } from "state/ViewState";
import css from "./Table.module.scss";

const MyTable = observer(() => {
  const { data } = useContext(SearchContext);
  const viewContext = useContext(ViewContext);

  const handleShowOnMap = (data: string) => {
    console.log("handleShowOnMap", data);
    viewContext.changeContentTab("map");
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Номер продукции",
      dataIndex: "Номер продукции",
      key: "Номер продукции",
      defaultSortOrder: "descend",
      sorter: (a, b) =>
        parseInt(a["Номер продукции"]) - parseInt(b["Номер продукции"]),
    },
    {
      title: "Коды ТН ВЭД ЕАЭС",
      dataIndex: "Коды ТН ВЭД ЕАЭС",
      key: "Коды ТН ВЭД ЕАЭС",
      defaultSortOrder: "descend",
      sorter: (a, b) =>
        parseInt(a["Коды ТН ВЭД ЕАЭС"]) - parseInt(b["Коды ТН ВЭД ЕАЭС"]),
    },
    {
      title: "Технические регламенты",
      dataIndex: "Технические регламенты",
      key: "Технические регламенты",
    },
    {
      title: "Группа продукции",
      dataIndex: "Группа продукции",
      key: "Группа продукции",
    },
    {
      title: "Общее наименование продукции",
      dataIndex: "Общее наименование продукции",
      key: "Общее наименование продукции",
    },
    {
      title: "Исследовательская лаборатория",
      dataIndex: "ИЛ",
      key: "ИЛ",
      filters: data
        .map((el) => el.ИЛ)
        .reduce(
          (prev: string[], cur) =>
            prev.includes(cur) ? [...prev] : [...prev, cur],
          []
        )
        .map((el) => ({ text: el, value: el })),
      //@ts-ignore
      onFilter: (value: string, record) => record.ИЛ.includes(value),
    },
    {
      title: "Заявитель",
      dataIndex: "Заявитель",
      key: "Заявитель",
      filters: data
        .map((el) => el.Заявитель)
        .reduce(
          (prev: string[], cur) =>
            prev.includes(cur) ? [...prev] : [...prev, cur],
          []
        )
        .map((el) => ({ text: el, value: el })),
      //@ts-ignore
      onFilter: (value: string, record) => record.Заявитель.includes(value),
    },
    {
      title: "Адрес Заявителя",
      dataIndex: "Адрес Заявителя",
      key: "Адрес Заявителя",
    },
    {
      title: "Изготовитель",
      dataIndex: "Изготовитель",
      key: "Изготовитель",
    },
    {
      title: "Страна",
      dataIndex: "Страна",
      key: "Страна",
      filters: data
        .map((el) => el.Страна)
        .reduce(
          (prev: string[], cur) =>
            prev.includes(cur) ? [...prev] : [...prev, cur],
          []
        )
        .map((el) => ({ text: el, value: el })),
      //@ts-ignore
      onFilter: (value: string, record) => record.Страна.includes(value),
    },
    {
      title: "Адрес изготовителя",
      dataIndex: "Адрес изготовителя",
      key: "Адрес изготовителя",
      render: (text) => (
        <Space size="middle">
          <span>{text}</span>
          <Button onClick={() => handleShowOnMap(text)}>
            <GlobalOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table className={css.table} columns={columns} dataSource={data || []} />
  );
});

export default MyTable;
