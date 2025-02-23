import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Home from './pages/home.jsx';
import TestHome from './pages/testHome.jsx';
import Collin from './pages/collin.jsx';
import Sage from './pages/sage.jsx';
import Kevin from './pages/kevin.jsx';
import James from './pages/james.jsx';
import Olivia from './pages/olivia.jsx';
import James3D from "./pages/james3d.jsx";




function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/test" element={<TestHome />} />
        <Route path="/collin" element={<Collin />} />
        <Route path="/sage" element={<Sage />} />
        <Route path="/kevin" element={<Kevin />} />
        <Route path="/james" element={<James />} />
        <Route path="/olivia" element={<Olivia />} />
        <Route path="/james3d" element = {<James3D/>} />

      </Routes>
    </Router>
  );
}

export default App;
