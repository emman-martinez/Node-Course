import axios from "axios";

const httpClientPlugin = {
  get: async (url: string) => {
    // const resp = await fetch(url);
    // const data = await resp.json();
    // return data;
    const { data } = await axios.get(url);
    return data;
  },
  post: async (url: string, body: any) => {
    throw new Error("Not implemented");
  },
  put: async (url: string, body: any) => {
    throw new Error("Not implemented");
  },
  delete: async (url: string) => {
    throw new Error("Not implemented");
  },
};

export default httpClientPlugin;
