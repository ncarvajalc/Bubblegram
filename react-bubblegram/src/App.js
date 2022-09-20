import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Feed from "./components/Feed";

const signUpURL = "/";
const feedURL = "/feed";

function App() {
  return (
    <div className="App">
      <nav></nav>
      <Routes>
        <Route path={signUpURL} element={<SignUp />} />
        <Route path={feedURL} element={<Feed />} />
      </Routes>
    </div>
  );
}

export default App;
