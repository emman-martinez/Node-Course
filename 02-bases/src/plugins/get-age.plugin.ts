import getAgePlugin from "get-age";

const getAge = (birthday: string) => {
  if (!birthday) return new Error("Birthday is required");

  // return getAgePlugin(birthday);
  return new Date().getFullYear() - new Date(birthday).getFullYear();
};

export default getAge;
