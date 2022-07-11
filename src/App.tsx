import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Home from "./pages/Home"
import Store from './pages/Store'
import About from './pages/About'
import ShoppingItemDetail from './components/ShoppingItemDetail'
import Navbar from './components/Navbar'
import { ShoppingCartProvider } from './context/ShoppingCartContext'

function App() {
  return ( 
    <ShoppingCartProvider>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:name/detail" element={<ShoppingItemDetail />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
        </Routes>
    </ShoppingCartProvider>
)};

export default App;
