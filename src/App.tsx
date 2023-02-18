import Wrapper from "@layouts/Wrapper";
import { NotifyContainer } from "@utils/notify";
import AuthenticatedApp from "./routes/AuthenticatedApp";
import { Auth, useAuth } from "context/auth-context";
import UnauthenticatedApp from "./routes/UnauthenticatedApp";

function App() {
  const { token } = useAuth() as unknown as Auth;

  return (
    <div className="App">
      <NotifyContainer />
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
