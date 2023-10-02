import "./App.css";
import { getGoogleUrl } from "./utils/getGoogleUrl";

function App() {
  const from = ((location.state)?.from.pathname) || "/profile";

  return (
    <>
      hello
      <a href={getGoogleUrl(from)}>
        Continue with Google
      </a>
    </>
  );
}

export default App;
