import { makeAutoObservable } from "mobx";
import { createContext } from "react";

export type SidebarTab = "create" | "search";
export type ContentTab = "table" | "map";

class ViewState {
  sidebar: SidebarTab;
  content: ContentTab;
  constructor() {
    this.sidebar = "create";
    this.content = "table";
    makeAutoObservable(this);
  }
  changeSidebarTab(value: SidebarTab) {
    this.sidebar = value;
  }
  changeContentTab(value: ContentTab) {
    this.content = value;
  }
}

export const viewState = new ViewState();
export const ViewContext = createContext(viewState);
