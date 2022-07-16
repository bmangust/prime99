import css from "./Sidebar.module.scss";
import cn from "classnames";
import { FC } from "react";
import ProductCard from "components/ProductCard/ProductCard";
import { Tabs } from "antd";
import Search from "components/Search/Search";
import {
  InputsContext,
  inputsState,
  OptionsContext,
  optionsState,
} from "components/ProductCard/state";
const { TabPane } = Tabs;

interface Props {
  className?: string;
}

const Sidebar: FC<Props> = ({ className }) => {
  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <div className={cn(className, css.sidebar)}>
      <Tabs defaultActiveKey="1" onChange={onChange}>
        <TabPane tab="Поиск" key="1">
          <Search />
        </TabPane>
        <TabPane tab="Создать" key="2">
          <OptionsContext.Provider value={optionsState}>
            <InputsContext.Provider value={inputsState}>
              <ProductCard />
            </InputsContext.Provider>
          </OptionsContext.Provider>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Sidebar;
