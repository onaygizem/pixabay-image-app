import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import ImageSearchScreen from '../src/components/imageSearchScreen'; //  ImageSearchScreen component
import ImageDetailScreen from '../src/components/imageDetailScreen'; //  ImageSearchScreen component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ImageSearchScreen />} />
        <Route path="/:imageId" element={<ImageDetailScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;