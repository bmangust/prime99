import css from "./App.module.scss";
import Layout from "components/Layout/Layout";
import Map from "components/Map/Map";
import { Tabs } from "antd";
import MyTable from "components/Table/Table";
const { TabPane } = Tabs;

function App() {
  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <div className={css.app}>
      <Layout>
        <div className={css.content}>
          <Tabs className={css.tabs} defaultActiveKey="1" onChange={onChange}>
            <TabPane tab="Карта" key="1">
              <Map />
            </TabPane>
            <TabPane tab="Таблица" key="2">
              <MyTable />
            </TabPane>
          </Tabs>
        </div>
      </Layout>
    </div>
  );
}

export default App;
