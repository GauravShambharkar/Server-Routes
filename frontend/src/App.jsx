import "./App.css";
import { Router } from "react-router-dom";
import Nav from "./components/router/Nav";
import Routers from "./components/router/Routers";

function App() {
  return (
      <div className="min-h-screen bg-gray-100">
        <Nav />
      </div>
  );
}

export default App;
