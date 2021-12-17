import { createContext, useContext } from "react";
import TripStore from "./tripStore/tripStore";

interface Store {
  tripStore: TripStore;
}

export const store: Store = {
  tripStore: new TripStore(),
};

export const StoreContext = createContext(store);
// create react hoock of store
export function useStore() {
  return useContext(StoreContext);
}
