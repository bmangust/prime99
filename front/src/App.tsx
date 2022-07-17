import css from "./App.module.scss";
import Layout from "components/Layout/Layout";
import Content from "components/Content/Content";
import { SearchContext, searchState } from "state/SearchState";
import { ViewContext, viewState } from "state/ViewState";

function App() {
  return (
    <div className={css.app}>
      <ViewContext.Provider value={viewState}>
        <SearchContext.Provider value={searchState}>
          <Layout>
            <Content />
          </Layout>
        </SearchContext.Provider>
      </ViewContext.Provider>
    </div>
  );
}

export default App;
