import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import Store from './pages/Store'
import About from './pages/About'
import ShoppingItemDetail from './components/ShoppingItemDetail'
import Navbar from './components/Navbar'
import RegisterationForm from './pages/Registration'
import LoginForm from './pages/Login'
import { ShoppingCartProvider } from './context/ShoppingCartContext'
import { RegistrationFormProvider } from './context/RegistrationContext'
import { SessionsProvider } from './context/SessionContext'
import ProductListState from './context/ProductListState'

function App() {
  return ( 
    <ProductListState>
      <ShoppingCartProvider>
        <RegistrationFormProvider>
          <SessionsProvider>
            <Navbar />
            <Routes>
              <Route path="/product/:id/detail" element={<ShoppingItemDetail />} />
              <Route path="/" element={<Home />}/>
              <Route path="/register" element={<RegisterationForm />} />
              <Route path="/store" element={<Store />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </SessionsProvider>
          </RegistrationFormProvider>
      </ShoppingCartProvider>
    </ProductListState>

)};

export default App;
