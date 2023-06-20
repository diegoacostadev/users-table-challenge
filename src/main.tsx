import ReactDOM from "react-dom/client";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";

import App from "./App.tsx";
import "simpledotcss/simple.min.css";
import "./index.css";

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  // </React.StrictMode>,
);
