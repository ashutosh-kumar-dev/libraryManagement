import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Library from "./Library";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Library />} />
        
      </Routes>
    </>
  );
}

export default App;
