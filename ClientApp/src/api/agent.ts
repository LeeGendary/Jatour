import axios, { AxiosError, AxiosResponse } from "axios";
import { Trip } from "../Models/trip";
import { User, UserFormValues } from "../Models/user";
import { store } from "../stores/store";
import { toast } from "react-toastify";
import { history } from "..";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token) config.headers!.Authorization = `Bearer ${token}`;
  return config;
});

// delay request
axios.interceptors.response.use(
  async (response) => {
    await sleep(500);
    return response;
  },
  async (error: AxiosError) => {
    const { data, status } = error.response!;
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 404:
        toast.error(data.title);
        break;
      case 500:
        history.push({
          pathname: "/server-error",
          state: { error: data },
        });
        break;
    }
    console.log("caught by interceptor");
    return await Promise.reject(error.response);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
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

const TestErrors = {
  get400Error: () => request.get("/buggy/bad-request"),
  get401Error: () => request.get("/buggy/unauthorised"),
  get404Error: () => request.get("/buggy/not-found"),
  get500Error: () => request.get("/buggy/server-error"),
  getValidationError: () => request.get("/buggy/validation-error"),
};

const agent = {
  Trips,
  Account,
  TestErrors,
};

export default agent;
