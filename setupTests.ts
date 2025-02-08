import "@testing-library/jest-dom";
import "whatwg-fetch";
import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();

import { TextEncoder, TextDecoder } from "util";

if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === "undefined") {
  (global as any).TextDecoder = TextDecoder;
}
