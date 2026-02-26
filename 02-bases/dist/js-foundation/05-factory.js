const buildMakePerson = ({ getAge, uuidv4 }) => {
    return ({ name, birthday }) => {
        return {
            id: uuidv4(),
            name,
            birthday,
            age: getAge(birthday),
        };
    };
};
export default buildMakePerson;
//# sourceMappingURL=05-factory.js.map