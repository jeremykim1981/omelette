import "./App.css";
import "./Vimeo.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import Login from "./components/Login";
import ApolloClient from "./appllo/apolloClient";
import WithAuth from "./components/Main/WithAuth";
import WithNoAuth from "./components/Main/WithNoAuth";
import ChatMain from "./components/Chat/ChatMain";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import QA from "./components/Chat/QAMain";
import ControllerMain from "./components/Chat/ControllerMain";
import ImportMain from "./components/Import/importMain";

function App() {
  const { client } = ApolloClient();
  return (
    <div className="font-Krungsri ">
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route exact path="/LIVE" component={WithNoAuth} />
            <ProtectedRoute exact path="/" component={WithAuth} />
            <ProtectedRoute exact path="/chat" component={ChatMain} />
            <Route exact path="/qa" component={QA} />
            <Route exact path="/import" component={ImportMain} />
            <ProtectedRoute
              exact
              path="/controller"
              component={ControllerMain}
            />
          </Switch>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
