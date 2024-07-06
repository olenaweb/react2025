export type Gender = "Male" | "Female" | "unknown";
export type Status = "Alive" | "Dead" | "unknown";
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

export interface Props {
  results: Character[];
}
export interface Response {
  info: Info;
  results: Character[];
}

export type StateAppPage = {
  storeValue: string;
  isLoading: boolean;
  requestData: Response;
};

export type SearchState = {
  searchValue: string;
};
