import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StyledInbox from "./components/inbox";
import Message from "./components/message";
import { useMediaQuery } from "react-responsive";

function App() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  return (
    <Router>
      <Switch>
        <Route path={"/message/:name"}>
          <Message isTabletOrMobile={isTabletOrMobile} />
        </Route>
        <Route path="/">
          <StyledInbox isTabletOrMobile={isTabletOrMobile} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
