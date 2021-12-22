import { makeAutoObservable, runInAction } from "mobx";
import agent from "../../api/agent";
import { User, UserFormValues } from "../../Models/user";
import { store } from "../store";

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
    try {
      const user = await agent.Account.login(creds);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
      // redirect to dashboard
      // history.push('/home');
      console.log(user);
    } catch (error) {
      throw error;
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    window.localStorage.removeItem("jwt");
    this.user = null;
    // redirect to login
    // history.push('/');
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
