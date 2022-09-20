import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";

const signUpURL = "/";

function App() {
  return (
    <div className="App">
      <nav></nav>
      <Routes>
        <Route path={signUpURL} element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
