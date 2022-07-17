import css from "./Content.module.scss";
import { Tabs } from "antd";
import Map from "components/Map/Map";
import MyTable from "components/Table/Table";
import { useContext } from "react";
import { ContentTab, ViewContext } from "state/ViewState";
import { observer } from "mobx-react-lite";
const { TabPane } = Tabs;

const Content = observer(() => {
  const viewContext = useContext(ViewContext);
  const onChange = (key: string) => {
    viewContext.changeContentTab(key as ContentTab);
  };

  return (
    <div className={css.content}>
      <Tabs
        className={css.tabs}
        defaultActiveKey="table"
        activeKey={viewContext.content}
        onChange={onChange}
      >
        <TabPane tab="Таблица" key="table">
          <MyTable />
        </TabPane>
        <TabPane tab="Карта" key="map">
          <Map />
        </TabPane>
      </Tabs>
    </div>
  );
});

export default Content;
