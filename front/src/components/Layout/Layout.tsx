import Header from "components/Header/Header";
import Sidebar from "components/Sidebar/Sidebar";
import { FC, ReactNode } from "react";
import css from "./Layout.module.scss";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className={css.layout}>
      <Header className={css.header} />
      <Sidebar className={css.sider} />
      <div className={css.content}>{children}</div>
    </div>
  );
};

export default Layout;
