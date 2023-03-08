import Wrapper from "@layouts/Wrapper";
import { NotifyContainer } from "@utils/notify";
import AuthenticatedApp from "./routes/AuthenticatedApp";
import { Auth, useAuth } from "context/auth-context";
import UnauthenticatedApp from "./routes/UnauthenticatedApp";

function App() {
  const { token } = useAuth();
  return (
    <div className="App">
      {token ? (
        <Wrapper>
          <AuthenticatedApp />
        </Wrapper>
      ) : (
        <UnauthenticatedApp />
      )}
    </div>
  );
}

export default App;
