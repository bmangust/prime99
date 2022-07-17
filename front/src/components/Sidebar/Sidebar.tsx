import css from "./Sidebar.module.scss";
import cn from "classnames";
import { FC, useContext } from "react";
import ProductCard from "components/ProductCard/ProductCard";
import { Tabs } from "antd";
import Search from "components/Search/Search";
import { SidebarTab, ViewContext } from "state/ViewState";
import { observer } from "mobx-react-lite";
const { TabPane } = Tabs;

interface Props {
  className?: string;
}

const Sidebar: FC<Props> = observer(({ className }) => {
  const viewContext = useContext(ViewContext);
  const onChange = (key: string) => {
    viewContext.changeSidebarTab(key as SidebarTab);
  };

  return (
    <div className={cn(className, css.sidebar)}>
      <Tabs
        defaultActiveKey="create"
        activeKey={viewContext.sidebar}
        onChange={onChange}
      >
        <TabPane tab="Создать" key="create">
          <ProductCard />
        </TabPane>
        <TabPane tab="Поиск" key="search">
          <Search />
        </TabPane>
      </Tabs>
    </div>
  );
});

export default Sidebar;
