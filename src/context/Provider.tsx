import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./auth-context";
import { ReactQueryDevtools } from "react-query/devtools";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

const queryClient = new QueryClient();

interface IProps {
  children?: React.ReactNode;
}

const AppProviders: React.FC<IProps> = ({ children }) => {
  return (
    <Router>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AuthProvider>
    </Router>
  );
};

export { AppProviders };
