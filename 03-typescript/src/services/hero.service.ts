import { heroes } from "../data/heroes.js";

export const findHeroById = (id: number) => {
  return heroes.find((hero) => hero.id === id) || null;
};
