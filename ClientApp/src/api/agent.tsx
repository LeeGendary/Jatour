import axios, { AxiosResponse } from "axios";
import { Trip } from "../Models/trip";
import { User, UserFormValues } from "../Models/user";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};
// delay request
axios.interceptors.response.use(async (response) => {
  try {
    await sleep(1000);
    return response;
  } catch (error) {
    console.log(error);
    return await Promise.reject(error);
  }
});

const responseBody = <T,>(response: AxiosResponse<T>) => response.data;

const request = {
  get: <T,>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T,>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T,>(url: string, body: {}) =>
    axios.put<T>(url, body).then(responseBody),
  del: <T,>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Trips = {
  list: () => request.get<Trip[]>("/Trips"),
  details: (id: string) => request.get<Trip>(`/Trips/${id}`),
  create: (trip: Trip) => request.post<void>("/Trips", trip),
  update: (trip: Trip) => request.put<void>(`/Trips/${trip.id}`, trip),
  delete: (id: string) => request.del<void>(`/Trips/${id}`),
};

const Account = {
  current: () => request.get<User>("/account"),
  login: (user: UserFormValues) => request.post<User>("/account/login", user),
  register: (user: UserFormValues) =>
    request.post<User>("/account/register", user),
};

const agent = {
  Trips,
  Account,
};

export default agent;
