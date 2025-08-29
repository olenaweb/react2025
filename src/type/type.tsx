export interface FormData {
  population_growth_prct?: boolean;
  gdp?: boolean;
  cement_co2?: boolean;
  co2_growth_abs?: boolean;
  co2_growth_prct?: boolean;
  methane?: boolean;
  methane_per_capita?: boolean;
  nitrous_oxide?: boolean;
  nitrous_oxide_per_capita?: boolean;
  temperature_change_anomaly?: boolean;
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
  population_growth_prct?: number;
  gdp?: number;
  co2?: number;
  co2_per_capita?: number;
  cement_co2?: number;
  co2_growth_abs?: number;
  co2_growth_prct?: number;
  methane?: number;
  methane_per_capita?: number;
  nitrous_oxide?: number;
  nitrous_oxide_per_capita?: number;
  temperature_change_anomaly?: number;
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
