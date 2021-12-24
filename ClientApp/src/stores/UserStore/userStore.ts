import { makeAutoObservable, runInAction } from "mobx";
import agent from "../../api/agent";
import { User, UserFormValues } from "../../Models/user";
import { store } from "../store";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

export default class UserStore {
  user: User | null = null;
  /**
   *
   */
  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds: UserFormValues) => {
    await agent.Account.login(creds)
      .then((res) => {
        store.commonStore.setToken(res.token);
        runInAction(() => (this.user = res));
        console.log(res);
      })
      .catch((error) => {
        throw error;
      });
  };

  register = async (creds: UserFormValues) => {
    await agent.Account.register(creds)
      .then(() => {})
      .catch((error) => {
        toast.error("Register Fail - " + error.response);
      });
  };

  logout = () => {
    store.commonStore.setToken(null);
    window.localStorage.removeItem("jwt");
    this.user = null;
  };

  getuser = async () => {
    try {
      const user = await agent.Account.current();
      runInAction(() => (this.user = user));
    } catch (error) {
      console.log(error);
    }
  };
}
