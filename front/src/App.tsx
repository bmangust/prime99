import css from "./App.module.scss";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <div className={css.app}>
      <Layout>content</Layout>
    </div>
  );
}

export default App;
