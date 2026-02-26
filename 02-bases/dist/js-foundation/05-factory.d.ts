interface BuildMakePerson {
    getAge: (birthday: string) => number | Error;
    uuidv4: () => string;
}
interface Person {
    name: string;
    birthday: string;
}
declare const buildMakePerson: ({ getAge, uuidv4 }: BuildMakePerson) => ({ name, birthday }: Person) => {
    id: string;
    name: string;
    birthday: string;
    age: number | Error;
};
export default buildMakePerson;
//# sourceMappingURL=05-factory.d.ts.map