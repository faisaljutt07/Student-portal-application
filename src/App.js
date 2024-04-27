import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import AddEdits from './pages/AddEdit';
import View from './pages/View';
import About from './pages/About';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <ToastContainer position='top-center' />


        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddEdits />} />
          <Route path="/update/:id" element={<AddEdits />} />
          <Route path="/view/:id" element={<View />} />
          <Route path="/about" element={<About />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
