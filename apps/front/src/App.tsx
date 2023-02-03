import Router from "./components/Router/Router";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { proxy } from "valtio";

export const globalStateProxy = proxy({ refetchFigures: () => {}, refetchWishes: () => {}, refetchStats: () => {} });

function App() {
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
