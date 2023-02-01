import Wrapper from "@layouts/Wrapper";
import FullPageSpinner from "@pages/FullPageSpinner";
import { NotifyContainer } from "@utils/notify";
import AuthenticatedApp from "AuthenticatedApp";
import { getAccessToken } from "context";
import UnauthenticatedApp from "UnauthenticatedApp";

function App() {
  const at = getAccessToken();
  return (
    <div className="App">
      <NotifyContainer />
      {at ? (
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
