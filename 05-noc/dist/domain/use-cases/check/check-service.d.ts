interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}
type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;
export declare class CheckService implements CheckServiceUseCase {
    private readonly successCallback;
    private readonly errorCallback;
    constructor(successCallback: SuccessCallback, errorCallback: ErrorCallback);
    execute(url: string): Promise<boolean>;
}
export {};
//# sourceMappingURL=check-service.d.ts.map