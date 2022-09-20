import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Feed from "./components/Feed";
import SignIn from "./components/SignIn";

const signUpURL = "/";
const signInURL = "/signin";
const feedURL = "/feed";

function App() {
  return (
    <div className="App">
      <nav></nav>
      <Routes>
        <Route path={signUpURL} element={<SignUp />} />
        <Route path={signInURL} element={<SignIn />} />
        <Route path={feedURL} element={<Feed />} />
      </Routes>
    </div>
  );
}

export default App;
