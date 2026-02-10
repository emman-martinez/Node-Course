import getAgePlugin from "get-age";

const getAge = (birthday: string) => {
  if (!birthday) return new Error("Birthday is required");

  return getAgePlugin(birthday);
};

export default getAge;
