import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Login,
  Navbar,
  Popular,
  Recomended,
  Search,
  SignUp,
  Watchlist,
} from "./Components";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/search" element={<Search />} exact />
          <Route path="/" element={<Popular />} exact />
          <Route path="/signup" element={<SignUp />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/watchlist" element={<Watchlist />} exact />
          <Route path="/recomend" element={<Recomended />} exact />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
