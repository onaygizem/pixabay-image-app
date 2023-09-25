import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import ImageSearchScreen from '../src/components/imageSearchScreen'; //  ImageSearchScreen component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ImageSearchScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;