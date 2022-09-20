import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

const signUpURL = "/";
const signInURL = "/signin";

function App() {
  return (
    <div className="App">
      <nav></nav>
      <Routes>
        <Route path={signUpURL} element={<SignUp />} />
        <Route path={signInURL} element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
