import { characterApi } from "@/request/characterApi";
import AppPage from "./AppPage";
import StoreProvider from "@/store/storeProviders";
import { makeStore } from "@/store/store";

export default async function Page() {
  console.log("SSR fetching characters...");
  const store = makeStore();

  await store.dispatch(characterApi.endpoints.getCharacters.initiate(" -1"));

  await Promise.all(store.dispatch(characterApi.util.getRunningQueriesThunk()));

  const preloadedState = store.getState();

  return (
    <StoreProvider initialState={preloadedState}>
      <AppPage />
    </StoreProvider>
  );
}
