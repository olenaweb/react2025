export type FavoriteItem = {
  id: number;
  name: string;
  image?: string;
  gender: string;
  status: string;
  species?: string;
};

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
  status: string;
  species?: string;
  type?: string;
  gender: string;
  origin?: Location;
  location?: Location;
  image?: string;
  episode?: string[];
  url?: string;
  created?: string;
}
export interface CharacterArr {
  results: Character[];
}

export interface SuccessResponse {
  info: Info;
  results: Character[];
}

export interface ErrorResponse {
  error: string;
}

export type Response = SuccessResponse | ErrorResponse;

export function isNotNullable<T>(value: T): value is NonNullable<T> {
  return value != null;
}
