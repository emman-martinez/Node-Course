import axios from "axios";

const httpClientPlugin = {
  get: async (url: string) => {
    // const resp = await fetch(url);
    // const data = await resp.json();
    // return data;
    const { data } = await axios.get(url);
    return data;
  },
  // post: async (url, body) => {},
  // put: async (url, body) => {},
  // delete: async (url) => {},
};

export default httpClientPlugin;
