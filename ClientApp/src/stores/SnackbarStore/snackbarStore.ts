import { makeAutoObservable } from "mobx";

interface SnackBar {
  open: boolean;
  body: JSX.Element | null;
}

export default class SnackBarStore {
  snackbar: SnackBar = {
    open: false,
    body: null,
  };

  constructor() {
    makeAutoObservable(this);
  }

  openSnackBar = (content: JSX.Element) => {
    this.snackbar.open = true;
    this.snackbar.body = content;
  };

  closeSnackBar = () => {
    this.snackbar.open = false;
    this.snackbar.body = null;
  };
}
