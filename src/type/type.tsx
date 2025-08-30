export interface FormData {
  co2_per_gdp?: boolean;
  gdp?: boolean;
  ghg_per_capita?: boolean;
  cumulative_co2?: boolean;
  co2_growth_prct?: boolean;
  methane?: boolean;
  methane_per_capita?: boolean;
  nitrous_oxide?: boolean;
  nitrous_oxide_per_capita?: boolean;
  total_ghg?: boolean;
}

export interface ErrorResponse {
  error: string;
}

export type Response = CountryData[] | ErrorResponse;

export interface CountryData {
  id: number;
  country: string;
  iso_code?: string;
  data: Values[];
}

export interface Values {
  year: number;
  population: number;
  co2_per_gdp?: number;
  gdp?: number;
  co2?: number;
  co2_per_capita?: number;
  ghg_per_capita?: number;
  cumulative_co2?: number;
  co2_growth_prct?: number;
  methane?: number;
  methane_per_capita?: number;
  nitrous_oxide?: number;
  nitrous_oxide_per_capita?: number;
  total_ghg?: number;
}
export interface FetchError extends Error {
  message: string;
}

export interface RawDataStructure {
  [countryName: string]: {
    iso_code?: string;
    data: Values[];
  };
}
