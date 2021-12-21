import { makeAutoObservable } from "mobx";
export default class ThemeStore {
  drawerState = false;
  /**
   * Bind the Observable in the constructor
   */
  constructor() {
    makeAutoObservable(this);
  }

  // Action for Loading page
  setdrawerState = (state: boolean) => {
    this.drawerState = state;
  };
}
