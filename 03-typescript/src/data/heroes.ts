export interface Hero {
  id: number;
  name: string;
  power: string;
  owner: string;
}

export const heroes: Hero[] = [
  { id: 1, name: "Superman", power: "Flight", owner: "DC" },
  { id: 2, name: "Batman", power: "Intelligence", owner: "DC" },
  { id: 3, name: "Wonder Woman", power: "Strength", owner: "DC" },
  { id: 4, name: "Spider-Man", power: "Wall-Crawling", owner: "Marvel" },
];
