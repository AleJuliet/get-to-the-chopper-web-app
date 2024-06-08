import React from 'react';
import './assets/css/app.css';
import Home from './components/screens/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Tracking from './components/screens/Tracking';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tracking" element={<Tracking />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
