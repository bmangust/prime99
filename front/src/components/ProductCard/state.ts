import { makeAutoObservable, toJS } from "mobx";
import { createContext } from "react";

const defaultInputs = {
  tnved1: "",
  tnved2: "",
  id: "",
  reglament: "",
  group: "",
  name: "",
  lab: "",
  reporter: "",
  reporterAddress: "",
  manufacturer: "",
  manufacturerAdress: "",
  country: "",
};

export type IInputs = typeof defaultInputs;

export type Fields = keyof typeof defaultInputs;

class Inputs {
  inputs: {
    tnved1: string;
    tnved2: string;
    id: string;
    reglament: string;
    group: string;
    name: string;
    lab: string;
    reporter: string;
    reporterAddress: string;
    manufacturer: string;
    manufacturerAdress: string;
    country: string;
  };

  constructor(defaultInputs: IInputs) {
    this.inputs = defaultInputs;

    makeAutoObservable(this);
  }

  update(name: string, value: string) {
    console.log("Input update", name, value);
    if (value === null) return;
    // this.inputs[name as Fields] = "";
    this.inputs[name as Fields] = value;
  }

  reset(name: string) {
    this.inputs[name as Fields] = "";
  }

  resetForm() {
    this.inputs = defaultInputs;
  }
}

export const inputsState = new Inputs(defaultInputs);
export const InputsContext = createContext<Inputs>(inputsState);

export interface IOption {
  value: string;
  label?: string;
}

const defaultOptions = {
  tnved1: [],
  tnved2: [],
  id: [],
  reglament: [],
  group: [],
  name: [],
  lab: [],
  reporter: [],
  reporterAddress: [],
  manufacturer: [],
  manufacturerAdress: [],
  country: [],
};

export type IOptions = typeof defaultOptions;

class Options {
  options: {
    tnved1: IOption[];
    tnved2: IOption[];
    id: IOption[];
    reglament: IOption[];
    group: IOption[];
    name: IOption[];
    lab: IOption[];
    reporter: IOption[];
    reporterAddress: IOption[];
    manufacturer: IOption[];
    manufacturerAdress: IOption[];
    country: IOption[];
  };

  constructor(defaultOptions: IOptions) {
    this.options = defaultOptions;

    makeAutoObservable(this);
  }

  update(name: string, value: IOption[]) {
    // console.log({ name, value });
    if (!value) return;
    this.options[name as Fields] = value;
  }
}
export const optionsState = new Options(defaultOptions);
export const OptionsContext = createContext<Options>(optionsState);
