interface GetUserById {
    (id: number, callback: (error: string | null, user?: {
        id: number;
        name: string;
    }) => void): void;
}
export declare const getUserById: GetUserById;
export default getUserById;
//# sourceMappingURL=03-callbacks.d.ts.map