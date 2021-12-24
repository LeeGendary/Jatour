import { makeAutoObservable, runInAction } from "mobx";
import agent from "../../api/agent";
import { User, UserFormValues } from "../../Models/user";
import { store } from "../store";
import { toast } from "react-toastify";
// import { useHistory } from "react-router";
import { history } from "../..";

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
        history.push("/home");
        console.log(res);
      })
      .catch((error) => {
        throw error;
      });
  };

  register = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.register(creds);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
      console.log(user);
      history.push("/home");
    } catch (error) {
      throw error;
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    window.localStorage.removeItem("jwt");
    this.user = null;
    history.push("/");
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
