import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./locales/translate.ts";
import { QueryClient, QueryClientProvider } from "react-query";
import { CharactersContextProvider } from "./contexts/CharacterDataContext/CharacterDataContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
      <CharactersContextProvider>
        <App />
      </CharactersContextProvider>
    </QueryClientProvider>
);
