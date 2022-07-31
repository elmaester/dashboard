import Parse from "parse";
import Pastebin from "./pastebin/Pastebin";

function App() {
  Parse.initialize(
    import.meta.env.VITE_PARSE_APPLICATION_ID,
    import.meta.env.VITE_PARSE_MASTER_KEY
  );
  Parse.serverURL = import.meta.env.VITE_PARSE_SERVER_URL;
  return <Pastebin />;
}

export default App;
