import Header from "./Components/Header/Header";
import './App.css'
import SimpleBottomNavigation from "./Components/MainNav";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Container } from "@material-ui/core";
import Movies from "./Pages/Movies/Movies";
import Series from "./Pages/Series/Series";
import Search from "./Pages/Search/Search";
import Trending from "./Pages/Trending/Trending";
function App() {
  return (
    <Router>
      <Header />
      <div className="app">
        <Container>
          <Switch>
            <Route path="/" component={Trending} exact />
            <Route path="/movies" component={Movies} exact />
            <Route path="/series" component={Series} exact />
            <Route path="/search" component={Search} exact />
          </Switch>
        </Container>
      </div>
      <SimpleBottomNavigation></SimpleBottomNavigation>
    </Router>
  );
}

export default App;
