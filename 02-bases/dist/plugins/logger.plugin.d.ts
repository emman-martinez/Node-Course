import winston from "winston";
export declare const logger: winston.Logger;
declare const buildLogger: (service: string) => {
    log: (message: string) => void;
    error: (message: string) => void;
};
export default buildLogger;
//# sourceMappingURL=logger.plugin.d.ts.map