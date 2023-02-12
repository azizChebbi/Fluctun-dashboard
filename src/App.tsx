import useAccessToken from "@hooks/useAccessToken";
import Wrapper from "@layouts/Wrapper";
import { NotifyContainer } from "@utils/notify";
import AuthenticatedApp from "AuthenticatedApp";
import UnauthenticatedApp from "UnauthenticatedApp";

function App() {
  const { token } = useAccessToken();

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
