import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Feed from "./components/Feed";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import SignIn from "./components/SignIn";
import UploadImage from "./components/UploadImage";

export const homeURL = "/";
export const signUpURL = "/signup";
export const feedURL = "/feed";
export const signInURL = "/signin";
export const uploadURL = "/upload";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path={homeURL} element={<Home />} />
        <Route path={signUpURL} element={<SignUp />} />
        <Route path={signInURL} element={<SignIn />} />
        <Route path={feedURL} element={<Feed />} />
        <Route path={uploadURL} element={<UploadImage />} />
      </Routes>
    </>
  );
}

export default App;
