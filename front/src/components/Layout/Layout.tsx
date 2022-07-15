import Header from "components/Header/Header";
import css from "./Layout.module.scss";

const Layout = () => {
  return (
    <div className={css.layout}>
      <Header className={css.header} />
      <div className={css.sider}>Sider</div>
      <div className={css.content}>Content</div>
      <div className={css.footer}>Footer</div>
    </div>
  );
};

export default Layout;
