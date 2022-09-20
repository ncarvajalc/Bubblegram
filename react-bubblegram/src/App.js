import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Feed from "./components/Feed";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import SignIn from "./components/SignIn";

export const homeURL = "/";
export const signUpURL = "/signup";
export const feedURL = "/feed";
const signInURL = "/signin";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path={homeURL} element={<Home />} />
        <Route path={signUpURL} element={<SignUp />} />
        <Route path={signInURL} element={<SignIn />} />
        <Route path={feedURL} element={<Feed />} />
      </Routes>
    </>
  );
}

export default App;
