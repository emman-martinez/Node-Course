interface BuildMakePerson {
  getAge: (birthday: string) => number | Error;
  uuidv4: () => string;
}

interface Person {
  name: string;
  birthday: string;
}

const buildMakePerson = ({ getAge, uuidv4 }: BuildMakePerson) => {
  return ({ name, birthday }: Person) => {
    return {
      id: uuidv4(),
      name,
      birthday,
      age: getAge(birthday),
    };
  };
};

export default buildMakePerson;
