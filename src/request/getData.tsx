// import { Response, SuccessResponse, ErrorResponse } from "../types/types";

// interface FetchError extends Error {
//   message: string;
// }

// export async function getData(): Promise<Response> {
//   try {
//     const response = await fetch('https://raw.githubusercontent.com/olenaweb/country/main/source-data.json');
//     const data = await response.json();
//     if (!response.ok) {
//       throw new Error(data.error || "Something went wrong!");
//     }
//     return data as SuccessResponse;
//   } catch (error) {
//     if (error instanceof Error) {
//       const fetchError: FetchError = {
//         name: error.name,
//         message: error.message,
//         stack: error.stack,
//       };
//       return { error: fetchError.message } as ErrorResponse;
//     } else {
//       return { error: "An unknown error occurred" } as ErrorResponse;
//     }
//   }
// }

// fetch('https://raw.githubusercontent.com/olenaweb/country/main/source-data.json')
//   .then(response => response.json())
//   .then(data => {
//     const selectedCountries = data.map(country => ({
//       country: country.country,
//       iso_code: country.iso_code,
//       data: country.data.map(value => ({
//         year: value.year,
//         population: value.population
//       }))
//     }));

//     console.log(selectedCountries);
//   })
//   .catch(error => {
//     console.error('Ошибка при получении данных:', error);
//   });
