import { Suspense } from "solid-js";
import { Router, type RouteDefinition } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { MetaProvider } from "@solidjs/meta";
import { querySession } from "./auth";
import AuthProvider from "./auth/Provider";
import Nav from "./components/Nav";
import ErrorNotification from "./components/Error";
import "./app.css";

export const route: RouteDefinition = {
  preload: ({ location }) => querySession(location.pathname)
};

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <AuthProvider>
            <Suspense>
              <Nav />
              {props.children}
              <ErrorNotification />
            </Suspense>
          </AuthProvider>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
