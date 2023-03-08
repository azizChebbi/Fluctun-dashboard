import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./auth-context";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { NotifyContainer } from "@utils/notify";

export const queryClient = new QueryClient();

interface IProps {
  children?: React.ReactNode;
}

const AppProviders: React.FC<IProps> = ({ children }) => {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <NotifyContainer />
        <AuthProvider>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthProvider>
      </QueryClientProvider>
    </Router>
  );
};

export { AppProviders };
