export type Gender = "Male" | "Female" | "unknown";
export type Status = "Dead" | "Alive" | "unknown";
export type Species =
  | "Human"
  | "Alien"
  | "Mythological Creature"
  | "Humanoid"
  | "Cronenberg"
  | "Animal";

export type Page = string | null;
export interface Info {
  count: number;
  pages: number;
  next: Page;
  prev: Page;
}

export interface Location {
  name: string;
  url: string;
}
export interface Character {
  id: number;
  name: string;
  status: Status;
  species: Species;
  type: string;
  gender: Gender;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}
export interface CardCharacter {
  key: number;
  name: string;
  status: Status;
  species: Species;
  gender: Gender;
  image: string;
}
export interface Props {
  propsArr: CardCharacter[];
}
export interface Response {
  info: Info;
  results: Character[];
}

export interface StateAppPage {
  search: string;
  loading: boolean;
  textError: string;
  characters: Character[];
}
