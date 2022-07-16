import { makeAutoObservable, toJS } from "mobx";

class Inputs {
  id: string;
  codesTn: string[];
  reglament: string;
  group: string;
  name: string;
  lab: string;
  reporter: string;
  reporterAddress: string;
  manufacturer: string;
  manufacturerAdress: string;
  country: string;

  constructor() {
    this.id = "";
    this.codesTn = ["", ""];
    this.reglament = "";
    this.group = "";
    this.name = "";
    this.lab = "";
    this.reporter = "";
    this.reporterAddress = "";
    this.manufacturer = "";
    this.manufacturerAdress = "";
    this.country = "";
    makeAutoObservable(this);
  }

  update(name: string, value: string) {
    console.log("Input update", name, value);

    if (name.includes("codesTn")) {
      const updatedCodes = name.includes("0")
        ? [value, toJS(this.codesTn[1])]
        : [toJS(this.codesTn[0]), value];
      console.log(updatedCodes, this.codesTn);
      this.codesTn = updatedCodes;
    } else {
      //@ts-ignore
      this[name] = value;
    }
  }
}

export interface IOption {
  value: string;
  label?: string;
}

class Options {
  id: IOption[];
  codesTn: IOption[];
  reglament: IOption[];
  group: IOption[];
  name: IOption[];
  lab: IOption[];
  reporter: IOption[];
  reporterAddress: IOption[];
  manufacturer: IOption[];
  manufacturerAdress: IOption[];
  country: IOption[];

  constructor() {
    this.id = [];
    this.codesTn = [];
    this.reglament = [];
    this.group = [];
    this.name = [];
    this.lab = [];
    this.reporter = [];
    this.reporterAddress = [];
    this.manufacturer = [];
    this.manufacturerAdress = [];
    this.country = [];
    makeAutoObservable(this);
  }

  update(name: string, value: IOption[]) {
    console.log({ name, value });
    if (!value) return;
    // @ts-ignore
    this[name] = value;
  }
}
export const inputsState = new Inputs();
export const optionsState = new Options();
