import css from "./Content.module.scss";
import { Tabs } from "antd";
import Map from "components/Map/Map";
import MyTable from "components/Table/Table";
import { useState } from "react";
const { TabPane } = Tabs;

const Content = () => {
  const [active, setActive] = useState("map");
  return (
    <div className={css.content}>
      <Tabs className={css.tabs} defaultActiveKey="table">
        <TabPane tab="Таблица" key="table">
          <MyTable />
        </TabPane>
        <TabPane tab="Карта" key="map">
          <Map />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Content;
