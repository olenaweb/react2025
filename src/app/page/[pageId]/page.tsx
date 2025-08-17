// import { makeStore } from "@/store/store";
import { characterApi } from "@/request/characterApi";
import AppPage from "./AppPage";
import { AppProvider } from "./AppProvider";
import { store } from "@/store/store";

export default async function Page() {
  await store.dispatch(
    characterApi.endpoints.getCharacters.initiate({
      name: "",
      page: "1",
    })
  );

  return (
    // <AppProvider preloadedState={store.getState()}>
    <AppProvider>
      <AppPage />
    </AppProvider>
  );
}
