"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckService = void 0;
class CheckService {
    successCallback;
    errorCallback;
    constructor(
    // private is used to automatically create and initialize class properties from constructor parameters
    // readonly indicates that the property cannot be reassigned after initialization
    successCallback, errorCallback) {
        this.successCallback = successCallback;
        this.errorCallback = errorCallback;
        // Initialize any necessary properties or dependencies here
    }
    async execute(url) {
        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`HTTP error! status: ${req.status}, url: ${url}`);
            }
            this.successCallback(); // Call the success callback if the request was successful
            return true; // Return true if the request was successful
        }
        catch (error) {
            console.error(`Error fetching URL: ${url}`, error);
            this.errorCallback(`${error}`); // Call the error callback if there was an error
            return false; // Return false if there was an error fetching the URL
        }
    }
}
exports.CheckService = CheckService;
//# sourceMappingURL=check-service.js.map