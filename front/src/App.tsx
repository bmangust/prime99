import css from "./App.module.scss";
import Layout from "components/Layout/Layout";
import Content from "components/Content/Content";
import { SearchContext, searchState } from "state/SearchState";

function App() {
  return (
    <div className={css.app}>
      <SearchContext.Provider value={searchState}>
        <Layout>
          <Content />
        </Layout>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
