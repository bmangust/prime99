import { makeAutoObservable } from "mobx";
import { createContext } from "react";

export interface DataType {
  index: number;
  "Номер продукции": string;
  "Коды ТН ВЭД ЕАЭС": string;
  "Технические регламенты": string;
  "Группа продукции": string;
  "Общее наименование продукции": string;
  ИЛ: string;
  Заявитель: string;
  "Адрес Заявителя": string;
  Изготовитель: string;
  Страна: string;
  "Адрес изготовителя": string;
}

class SearchState {
  data: DataType[];
  constructor() {
    this.data = [];
    makeAutoObservable(this);
  }
  async saveResuts(data: DataType[]) {
    this.data = data;
  }
  clear() {
    this.data = [];
  }
}

export const searchState = new SearchState();

export const SearchContext = createContext(searchState);
