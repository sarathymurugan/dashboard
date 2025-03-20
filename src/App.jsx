import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Dashtw from "./component/Dashtw";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={< Dashtw/>} />
      </Routes>
    </Router>
  );
 

 
}

export default App
