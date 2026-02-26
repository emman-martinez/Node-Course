import axios from "axios";
const httpClientPlugin = {
    get: async (url) => {
        // const resp = await fetch(url);
        // const data = await resp.json();
        // return data;
        const { data } = await axios.get(url);
        return data;
    },
    post: async (url, body) => {
        throw new Error("Not implemented");
    },
    put: async (url, body) => {
        throw new Error("Not implemented");
    },
    delete: async (url) => {
        throw new Error("Not implemented");
    },
};
export default httpClientPlugin;
//# sourceMappingURL=http-client.plugin.js.map