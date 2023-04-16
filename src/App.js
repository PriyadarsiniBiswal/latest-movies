//import logo from './logo.svg';
import "./App.css";
import { Container } from "@material-ui/core";
// import Search from "@material-ui/icons/Search";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Trending from "./pages/Trending/Trending";
import Movies from "./pages/Movies/Movies";
import Series from "./pages/Series/Series";
import Search from "./pages/Search/Search";
//import Search from "@material-ui/icons/Search";
import SimpleBottomNavigation from "./components/MainNav";

function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <Container>
          <Routes>
            <Route path="/" element={<Trending />} exact />
            <Route path="/Movies" element={<Movies />} />
            <Route path="/Series" element={<Series />} />
            <Route path="/Search" element={<Search />} />
          </Routes>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </Router>
  );
}

export default App;
