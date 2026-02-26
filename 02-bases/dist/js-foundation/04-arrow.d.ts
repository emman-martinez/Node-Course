interface GetUserById {
    (id: number, callback: (error: string | null, user: {
        id: number;
        name: string;
    } | null) => void): void;
}
declare const getUserById: GetUserById;
export default getUserById;
//# sourceMappingURL=04-arrow.d.ts.map