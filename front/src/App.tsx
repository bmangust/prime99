import css from "./App.module.scss";
import Layout from "components/Layout/Layout";
import Content from "components/Content/Content";

function App() {
  return (
    <div className={css.app}>
      <Layout>
        <Content />
      </Layout>
    </div>
  );
}

export default App;
