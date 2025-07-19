import "@testing-library/jest-dom";
import { server } from './mocks/server';
import 'whatwg-fetch';

import { TextEncoder as NodeTextEncoder, TextDecoder as NodeTextDecoder } from "util";

if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = NodeTextEncoder as typeof TextEncoder;
}

if (typeof global.TextDecoder === "undefined") {
  global.TextDecoder = NodeTextDecoder as typeof TextDecoder;
}


beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
