declare const httpClientPlugin: {
    get: (url: string) => Promise<any>;
    post: (url: string, body: any) => Promise<never>;
    put: (url: string, body: any) => Promise<never>;
    delete: (url: string) => Promise<never>;
};
export default httpClientPlugin;
//# sourceMappingURL=http-client.plugin.d.ts.map