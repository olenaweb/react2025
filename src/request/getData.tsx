import { ErrorResponse, Response, CountryData, Values } from "@/type/type";

interface FetchError extends Error {
  message: string;
}

interface RawDataStructure {
  [countryName: string]: {
    iso_code?: string;
    data: Values[];
  };
}

export async function getData(currYear: number): Promise<Response> {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/olenaweb/country/main/source-data.json"
    )
      .then((informdata) => {
        if (!informdata.ok) {
          throw new Error("Error when receiving data: " + informdata.statusText);
        }
        return informdata.json();
      })
      .then((informdata: RawDataStructure) => {
        // console.log('Raw data structure:', informdata);

        const countriesArray: CountryData[] = Object.keys(informdata).map((countryName) => ({
          country: countryName,
          iso_code: informdata[countryName].iso_code,
          data: informdata[countryName].data || [],
        }));

        const selectedCountries = countriesArray.map((country: CountryData) => ({
          country: country.country,
          iso_code: country.iso_code,
          data: country.data
            .filter((value: Values) => value.year === currYear)
            .map((value: Values) => ({
              year: value.year,
              population: value.population,
              population_growth_prct: value.population_growth_prct,
              gdp: value.gdp,
              co2: value.co2,
              co2_per_capita: value.co2_per_capita,
              co2_growth_abs: value.co2_growth_abs,
              co2_growth_prct: value.co2_growth_prct,
              methane: value.methane,
              methane_per_capita: value.methane_per_capita,
              nitrous_oxide: value.nitrous_oxide,
              nitrous_oxide_per_capita: value.nitrous_oxide_per_capita,
              temperature_change_anomaly: value.temperature_change_anomaly,
            })),
        }));
        return selectedCountries;
      });
    return response as CountryData[];
  } catch (error) {
    if (error instanceof Error) {
      const fetchError: FetchError = {
        name: error.name,
        message: error.message,
        stack: error.stack,
      };
      return { error: fetchError.message } as ErrorResponse;
    } else {
      return { error: "An unknown error occurred" } as ErrorResponse;
    }
  }
}
